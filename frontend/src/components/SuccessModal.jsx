import { Check, Copy, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuccessModal({ shortUrl, onClose }) {

  const handleCopy = () => {
    try {
      const input = document.createElement("input");
      input.value = shortUrl;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.body.removeChild(input);
    } catch (err) {
      alert("Copy failed. Please copy manually.");
    }
  };

  if (!shortUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="relative w-full max-w-md bg-white border shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <Check className="size-7" />
          </div>
          <CardTitle className="text-2xl">
            Congratulations 🎉
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Your short link is ready
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 break-all font-medium text-primary hover:underline"
            >
              {shortUrl}
            </a>

            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>

          <Button size="lg" onClick={handleCopy}>
            <Copy className="size-4" />
            Copy Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
