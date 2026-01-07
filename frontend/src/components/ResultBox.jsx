import { useState } from "react";
import { buildShortUrl } from "@/api/urlApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink } from "lucide-react";

export default function ResultBox({ code }) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const shortUrl = buildShortUrl(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="w-full bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">Your Short URL</CardTitle>
        <CardDescription>
          Click to open in a new tab or copy to clipboard
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-primary hover:text-primary/80 font-medium break-all transition-colors"
          >
            {shortUrl}
          </a>
          <ExternalLink className="size-4 text-muted-foreground shrink-0" />
        </div>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="lg"
          className="w-full"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}