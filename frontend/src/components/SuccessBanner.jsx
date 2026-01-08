import { useState } from "react";
import { Copy, X, Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuccessBanner({ shortUrl, onClose }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            // Reset "Copied" text after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-900/20 backdrop-blur-sm p-4 font-['Inter']">
            {/* The Main Card - Now Static (No animation) */}
            <Card className="relative w-full max-w-md bg-white border-[4px] border-black rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 hover:rotate-90 transition-transform duration-200"
                >
                    <X className="size-6 text-black" />
                </button>

                <div className="text-center space-y-6">
                    {/* Icon Header */}
                    <div className="mx-auto size-20 bg-[#D1FAE5] border-[3px] border-black rounded-[24px] flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        🎉
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-3xl font-[900] text-black tracking-tight">Here you go!!</h2>
                        <h2 className="text-2xl font-[900] text-black opacity-80">Your link is live now</h2>
                    </div>

                    {/* Link Display Area */}
                    <div className="bg-[#F8FAFC] border-[3px] border-black p-4 rounded-xl flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="flex-1 font-bold text-black truncate text-left text-sm">
                            {shortUrl}
                        </span>

                        {/* Functional Redirect Icon */}
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-black transition-colors"
                        >
                            <ExternalLink className="size-5 stroke-[2.5px]" />
                        </a>
                    </div>

                    <div className="pt-2">
                        {/* ONLY THE BUTTON ANIMATES:
                          active:translate-x-[4px] active:translate-y-[4px] -> Moves it "in"
                          active:shadow-none -> Removes the shadow to look flat
                        */}
                        <Button
                            onClick={handleCopy}
                            className="w-full h-14 bg-[#6366F1] hover:bg-[#4F46E5] text-white border-[3px] border-black rounded-xl text-lg font-[800] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform active:translate-x-[4px] active:translate-y-[4px] active:shadow-none uppercase tracking-wider italic"
                        >
                            {copied ? (
                                <span className="flex items-center gap-2">
                                    <Check className="size-5" /> COPIED!
                                </span>
                            ) : (
                                "COPY LINK"
                            )}
                        </Button>
                    </div>

                    <p className="text-[10px] font-black text-indigo-500/60 uppercase tracking-[0.2em] pt-2">
                        ⚡ Next links will be instant
                    </p>
                </div>
            </Card>
        </div>
    );
}