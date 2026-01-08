import { CheckCircle, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SuccessBanner({ shortUrl }) {
    const [copied, setCopied] = useState(false);

    if (!shortUrl) return null;

    // Remove http / https ONLY for display
    const displayUrl = shortUrl.replace(/^https?:\/\//, "");

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />

                <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline break-all"
                >
                    {displayUrl}
                </a>
            </div>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
            >
                <Copy className="h-4 w-4" />
            </Button>

            {copied && (
                <span className="text-xs text-green-600 absolute mt-10">
          Copied!
        </span>
            )}
        </div>
    );
}
