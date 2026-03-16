import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Monitor,
  MousePointer,
  Eye,
  Type,
} from "lucide-react";

export interface AgentEvent {
  id: string;
  type: string;
  status?: string;
  message?: string;
  timestamp: Date;
  raw?: any;
}

interface AgentEventLogProps {
  events: AgentEvent[];
  isRunning: boolean;
}

const getEventIcon = (type: string, status?: string) => {
  if (status === "COMPLETED")
    return <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />;
  if (status === "FAILED" || status === "ERROR")
    return <AlertCircle className="w-4 h-4 text-destructive shrink-0" />;
  if (type === "NAVIGATE" || type === "navigation")
    return <Globe className="w-4 h-4 text-accent shrink-0" />;
  if (type === "CLICK" || type === "click")
    return <MousePointer className="w-4 h-4 text-accent shrink-0" />;
  if (type === "TYPE" || type === "type")
    return <Type className="w-4 h-4 text-accent shrink-0" />;
  if (type === "SCREENSHOT" || type === "screenshot")
    return <Eye className="w-4 h-4 text-muted-foreground shrink-0" />;
  return <Monitor className="w-4 h-4 text-muted-foreground shrink-0" />;
};

import { Globe } from "lucide-react";

const AgentEventLog = ({ events, isRunning }: AgentEventLogProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  if (events.length === 0 && !isRunning) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Monitor className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-sm">No agent activity yet</p>
        <p className="text-xs mt-1">Submit a task to get started</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50 text-sm"
          >
            {getEventIcon(event.type, event.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {event.type}
                </span>
                {event.status && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      event.status === "COMPLETED"
                        ? "bg-primary/20 text-primary"
                        : event.status === "FAILED"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {event.status}
                  </span>
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {event.timestamp.toLocaleTimeString()}
                </span>
              </div>
              {event.message && (
                <p className="text-xs text-foreground/80 break-words whitespace-pre-wrap">
                  {event.message}
                </p>
              )}
            </div>
          </div>
        ))}
        {isRunning && (
          <div className="flex items-center gap-2 p-3 text-primary text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="animate-pulse-glow">Agent is working...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};

export default AgentEventLog;
