import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Check } from "lucide-react";

export default function ResultBox({ shortUrl }) {
    const [copied, setCopied] = useState(false);

    if (!shortUrl) return null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="w-full bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle>Your Short URL</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-primary font-medium break-all hover:underline"
                    >
                        {shortUrl}
                    </a>

                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open link"
                        className="p-1 rounded hover:bg-muted"
                    >
                        <ExternalLink className="size-4 text-muted-foreground" />
                    </a>
                </div>

                <Button onClick={handleCopy} variant="outline">
                    {copied ? (
                        <>
                            <Check className="size-4 mr-2" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="size-4 mr-2" />
                            Copy
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
