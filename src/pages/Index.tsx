import AgentTaskForm from "@/components/AgentTaskForm";
import AgentEventLog from "@/components/AgentEventLog";
import { useTinyFishAgent } from "@/hooks/useTinyFishAgent";
import { Zap, Terminal } from "lucide-react";

const Index = () => {
  const { events, isRunning, result, runAgent } = useTinyFishAgent();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 glow-border flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">TinyFish Agent</h1>
            <p className="text-xs text-muted-foreground">
              AI-powered browser automation
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <Terminal className="w-3 h-3" />
            <span>v1.0</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Task Form */}
        <section className="rounded-xl border border-border bg-card p-6 glow-border">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
            New Task
          </h2>
          <AgentTaskForm onSubmit={runAgent} isRunning={isRunning} />
        </section>

        {/* Event Log */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Agent Activity
          </h2>
          <AgentEventLog events={events} isRunning={isRunning} />
        </section>

        {/* Result */}
        {result && (
          <section className="rounded-xl border border-primary/30 bg-card p-6 glow-border">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
              Result
            </h2>
            <pre className="text-xs text-foreground/80 overflow-auto max-h-60 bg-secondary rounded-lg p-4">
              {JSON.stringify(result, null, 2)}
            </pre>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
