import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Zap } from "lucide-react";

interface AgentTaskFormProps {
  onSubmit: (url: string, goal: string) => void;
  isRunning: boolean;
}

const AgentTaskForm = ({ onSubmit, isRunning }: AgentTaskFormProps) => {
  const [url, setUrl] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && goal) onSubmit(url, goal);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Globe className="w-3 h-3" /> Target URL
        </label>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          disabled={isRunning}
          className="bg-secondary border-border font-mono text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Zap className="w-3 h-3" /> Task Description
        </label>
        <Textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Describe what the agent should do on this website..."
          required
          disabled={isRunning}
          rows={3}
          className="bg-secondary border-border font-mono text-sm resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={isRunning || !url || !goal}
        className="w-full font-mono uppercase tracking-wider text-sm"
      >
        {isRunning ? (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse-glow" />
            Agent Running...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" /> Launch Agent
          </span>
        )}
      </Button>
    </form>
  );
};

export default AgentTaskForm;
