import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AgentEvent } from "@/components/AgentEventLog";

export const useTinyFishAgent = () => {
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runAgent = useCallback(async (url: string, goal: string) => {
    setIsRunning(true);
    setEvents([]);
    setResult(null);

    const addEvent = (
      type: string,
      message: string,
      status?: string,
      raw?: any,
    ) => {
      setEvents((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          type,
          message,
          status,
          timestamp: new Date(),
          raw,
        },
      ]);
    };

    addEvent("INIT", `Starting agent for ${url}`);

    try {
      // Get the Supabase URL for the edge function
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/tinyfish-agent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token || supabaseKey}`,
            apikey: supabaseKey,
          },
          body: JSON.stringify({ url, goal }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`,
        );
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response stream");

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6).trim();
            if (!dataStr || dataStr === "[DONE]") continue;

            try {
              const data = JSON.parse(dataStr);
              const eventType = data.type || data.event || "EVENT";
              const status = data.status;
              const message =
                data.message ||
                data.description ||
                data.text ||
                (data.resultJson
                  ? JSON.stringify(data.resultJson, null, 2)
                  : null) ||
                JSON.stringify(data);

              addEvent(eventType, message, status, data);

              if (status === "COMPLETED" && data.resultJson) {
                setResult(data.resultJson);
              }
            } catch {
              addEvent("RAW", dataStr);
            }
          }
        }
      }

      addEvent("DONE", "Agent task completed");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      addEvent("ERROR", msg, "FAILED");
    } finally {
      setIsRunning(false);
    }
  }, []);

  return { events, isRunning, result, runAgent };
};
