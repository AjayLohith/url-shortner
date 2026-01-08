import { useState } from "react";
import { Check, Copy, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuccessModal({ shortUrl, onClose }) {
    const [copied, setCopied] = useState(false);

    if (!shortUrl) return null;ce

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="relative w-full max-w-md bg-white border shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground"
                >
                    <X className="size-4" />
                </button>

                <CardHeader className="text-center">
                    <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-green-600 text-white">
                        <Check className="size-7" />
                    </div>
                    <CardTitle className="text-2xl">Success 🎉</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 border p-3 rounded-lg">
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 break-all text-primary font-medium"
                        >
                            {shortUrl}
                        </a>
                        <ExternalLink className="size-4" />
                    </div>

                    <Button size="lg" onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy Link"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
