import React, { useState, useEffect } from 'react';

export default function EngagementPanel({ active, hasResult }) {
    const [logs, setLogs] = useState(["[SYSTEM]: Connection established..."]);
    const [zaps, setZaps] = useState(0);
    const [progress, setProgress] = useState(0);

    // 1. SIMULATE TERMINAL LOGS
    useEffect(() => {
        if (!active || hasResult) {
            setLogs(["[SYSTEM]: Connection established..."]);
            setProgress(0);
            return;
        }

        const messages = [
            "[INFO]: Pinging Render free-tier instance...",
            "[WAIT]: Instance is COLD. Sending wake-up signal...",
            "[INFO]: Server spinning up (eta ~15-30s)...",
            "[SYSTEM]: Database handshake initiated...",
            "[INFO]: Generating unique 6-character hash...",
            "[SUCCESS]: Instance online. Finalizing redirect..."
        ];

        const interval = setInterval(() => {
            setLogs(prev => {
                if (prev.length > messages.length) return prev;
                return [...prev, messages[prev.length - 1]];
            });
            setProgress(prev => (prev < 95 ? prev + 15 : prev));
        }, 3000); // New log every 3 seconds

        return () => clearInterval(interval);
    }, [active, hasResult]);

    // Don't show anything if not active or if the link is ready
    if (!active || hasResult) return null;

    return (
        <div className="mt-8 w-full max-w-md mx-auto space-y-4 animate-in fade-in zoom-in duration-500">

            {/* TERMINAL SECTION */}
            <div className="rounded-lg bg-slate-900 p-4 font-mono text-[11px] md:text-xs text-green-400 shadow-2xl border-t-[12px] border-slate-800">
                <div className="flex gap-1.5 mb-3 opacity-80">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"/>
                    <span className="text-slate-500 ml-2 text-[10px]">render-deploy-logs</span>
                </div>

                <div className="space-y-1.5 min-h-[120px]">
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-left-1 duration-300">
                            <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                            {log}
                        </div>
                    ))}
                    <div className="inline-block w-2 h-4 bg-green-400 animate-pulse align-middle ml-1" />
                </div>
            </div>

            {/* INTERACTIVE FIDGET SECTION */}
            <div className="bg-white border rounded-xl p-5 shadow-sm text-center space-y-3">
                <h4 className="text-sm font-semibold text-slate-700">Server is a bit sleepy... 😴</h4>
                <p className="text-xs text-slate-500">
                    Free tier servers take a moment to wake up.
                    Keep it busy while you wait!
                </p>

                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => setZaps(prev => prev + 1)}
                        className="group relative bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white px-5 py-2 rounded-lg font-medium shadow-md"
                    >
                        <span className="relative z-10">⚡ Zap the Server ({zaps})</span>
                        {/* Little particle effect simulation */}
                        {zaps > 0 && (
                            <span className="absolute -top-4 -right-2 text-indigo-500 animate-bounce text-xs font-bold">
                                +1 Energy
                            </span>
                        )}
                    </button>
                    <span className="text-[10px] text-slate-400 uppercase tracking-tighter italic">
                        Zapping provides psychological satisfaction only
                    </span>
                </div>
            </div>

            {/* REAL PROGRESS BAR */}
            <div className="px-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase">
                    <span>Booting Instance</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                    <div
                        className="bg-indigo-500 h-full transition-all duration-1000 ease-in-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

        </div>
    );
}