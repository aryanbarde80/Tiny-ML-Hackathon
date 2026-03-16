import React from "react";
import { motion } from "framer-motion";
import AgentTaskForm from "@/components/AgentTaskForm";
import AgentEventLog from "@/components/AgentEventLog";
import { useTinyFishAgent } from "@/hooks/useTinyFishAgent";
import { Fish, Terminal, Activity, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Index: React.FC = () => {
  const { events, isRunning, result, runAgent } = useTinyFishAgent();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/60 bg-black/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 group-hover:scale-105 transition-transform">
                <Fish size={16} className="text-indigo-400" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-white tracking-tight">
                  TinyFish Agent
                </h1>
                <p className="text-[10px] text-neutral-500 leading-none">
                  AI-powered automation
                </p>
              </div>
            </a>

            {/* Status Badge */}
            <Badge
              variant="outline"
              className={`
                text-[10px] font-mono tracking-wider px-2.5 py-1
                ${
                  isRunning
                    ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                    : "bg-neutral-800/50 text-neutral-500 border-neutral-800"
                }
              `}
            >
              {isRunning ? (
                <>
                  <Activity size={10} className="mr-1.5 animate-pulse" />
                  RUNNING
                </>
              ) : (
                <>
                  <Terminal size={10} className="mr-1.5" />
                  READY
                </>
              )}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        
        {/* Task Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-neutral-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white mb-1">
                    New Task
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Describe what you want the agent to do
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <Terminal size={16} className="text-indigo-400" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-5 sm:p-6">
              <AgentTaskForm onSubmit={runAgent} isRunning={isRunning} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Log Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-neutral-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-800">
                    <Activity size={16} className="text-neutral-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white mb-1">
                      Agent Activity
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Real-time execution log
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="text-[10px] font-mono bg-neutral-800/50 text-neutral-500 border-neutral-800 px-2 py-0.5"
                >
                  {events.length} EVENTS
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <AgentEventLog events={events} isRunning={isRunning} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Result Card */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-neutral-900 border-indigo-500/20 rounded-2xl overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

              <CardHeader className="border-b border-neutral-800 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      <Package size={16} className="text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white mb-1">
                        Execution Result
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Structured output from agent
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono bg-green-500/10 text-green-400 border-green-500/20 px-2 py-0.5"
                  >
                    ✓ SUCCESS
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-5 sm:p-6">
                <div className="relative">
                  <pre className="text-[11px] sm:text-xs text-neutral-400 font-mono overflow-auto max-h-80 bg-neutral-950 border border-neutral-800 rounded-xl p-4 leading-relaxed">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Bottom Spacer */}
      <div className="h-16" />
    </div>
  );
};

export default Index;