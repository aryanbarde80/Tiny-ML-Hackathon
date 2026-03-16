const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, goal } = await req.json();

    if (!url || !goal) {
      return new Response(
        JSON.stringify({ success: false, error: "URL and goal are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const primaryApiKey = Deno.env.get("TINYFISH_API_KEY");
    const secondaryApiKey = Deno.env.get("TINYFISH_SECONDARY_API_KEY");

    if (!primaryApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "TINYFISH_API_KEY not configured",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    let response: Response;
    let usedApiKey = primaryApiKey;

    try {
      response = await fetch(
        "https://agent.tinyfish.ai/v1/automation/run-sse",
        {
          method: "POST",
          headers: {
            "X-API-Key": primaryApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, goal }),
        },
      );

      // If primary key fails with specific status codes, try secondary key
      if (!response.ok && [401, 403, 429].includes(response.status) && secondaryApiKey) {
        console.warn(`Primary API key failed with status ${response.status}. Attempting with secondary key.`);
        usedApiKey = secondaryApiKey;
        response = await fetch(
          "https://agent.tinyfish.ai/v1/automation/run-sse",
          {
            method: "POST",
            headers: {
              "X-API-Key": secondaryApiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, goal }),
          },
        );
      }
    } catch (fetchError) {
      console.error("Error during TinyFish API fetch:", fetchError);
      // If primary fetch fails, and secondary key exists, try secondary
      if (secondaryApiKey) {
        console.warn("Primary API key fetch failed. Attempting with secondary key.");
        usedApiKey = secondaryApiKey;
        response = await fetch(
          "https://agent.tinyfish.ai/v1/automation/run-sse",
          {
            method: "POST",
            headers: {
              "X-API-Key": secondaryApiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, goal }),
          },
        );
      } else {
        throw fetchError; // Re-throw if no secondary key or secondary also failed
      }
    }

    if (!response.ok) {
      const errorData = await response.text();
      return new Response(
        JSON.stringify({
          success: false,
          error: `TinyFish API error [${response.status}] with ${usedApiKey === primaryApiKey ? 'primary' : 'secondary'} key: ${errorData}`,
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Stream SSE response back to client
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
