import { useState } from "react";
import { shortenUrl } from "@/api/urlApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";

export default function UrlForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const code = await shortenUrl(url);
      onResult(code);
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white border shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Link2 className="size-5 text-primary" />
          <CardTitle className="text-2xl">Shorten your URL</CardTitle>
        </div>
        <CardDescription>
          Paste a long URL and generate a short one
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="url"
            placeholder="https://example.com/very-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
          />

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Shortening..." : "Shorten URL"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
