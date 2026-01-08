import { useState } from "react";
import { Copy, ExternalLink, X, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuccessBanner({ shortUrl, originalUrl, onClose }) {
    const [copied, setCopied] = useState(false);

    if (!shortUrl) return null;

    // REMOVE http / https ONLY FOR DISPLAY
    const displayUrl = shortUrl.replace(/^https?:\/\//, "");

    const faviconUrl = originalUrl
        ? `https://www.google.com/s2/favicons?domain=${originalUrl}&sz=64`
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        // DARK OVERLAY ONLY
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <Card className="relative w-full max-w-md border shadow-lg">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                >
                    <X className="size-4" />
                </button>

                <div className="p-6 space-y-5 bg-white">
                    {/* HEADER */}
                    <div className="flex items-center gap-3">
                        <div className="size-12 rounded-full bg-white flex items-center justify-center text-3xl">
                            🎉
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">Here you go</h2>
                            <p className="text-sm text-muted-foreground">
                                Your shortened link is ready
                            </p>
                        </div>
                    </div>

                    {/* LINK BOX */}
                    <div className="flex items-center gap-3 p-3 rounded-md border">
                        {faviconUrl && (
                            <img
                                src={faviconUrl}
                                alt="favicon"
                                className="size-5"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        )}

                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 break-all text-primary font-medium hover:underline"
                        >
                            {displayUrl}
                        </a>

                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <ExternalLink className="size-4" />
                        </a>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2">
                        <Button onClick={handleCopy} className="flex-1">
                            {copied ? (
                                <>
                                    <Check className="size-4" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="size-4" /> Copy
                                </>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => window.open(shortUrl, "_blank")}
                        >
                            Open
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
