// FIXED FILE: UrlForm.jsx
import { useState } from "react";
import { shortenUrl } from "@/api/urlApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link2, Wand2 } from "lucide-react";

const SLUG_REGEX = /^[a-zA-Z0-9-_]{3,30}$/;

export default function UrlForm({ onResult, onSubmitStart }) {
    const [url, setUrl] = useState("");
    const [customSlug, setCustomSlug] = useState("");
    const [useCustomSlug, setUseCustomSlug] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isSlugValid =
        !useCustomSlug || SLUG_REGEX.test(customSlug.trim());

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        onSubmitStart(); // 🔥 THIS triggers engagement UI

        if (!isSlugValid) {
            setError("Alias must be 3–30 characters (a–z, 0–9, - or _)");
            return;
        }

        setLoading(true);

        try {
            const shortUrl = await shortenUrl(
                url,
                useCustomSlug ? customSlug.trim() : null
            );

            onResult({
                shortUrl,
                originalUrl: url,
            });

            setUrl("");
            setCustomSlug("");
            setUseCustomSlug(false);
        } catch (err) {
            setError(err.message || "Something went wrong");
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
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        className={`w-fit flex items-center gap-2 ${
                            useCustomSlug
                                ? "bg-black text-white"
                                : "hover:bg-muted"
                        }`}
                        onClick={() => setUseCustomSlug((prev) => !prev)}
                    >
                        <Wand2 className="size-5" />
                        {useCustomSlug ? "Custom slug enabled" : "Use custom alias"}
                    </Button>

                    {useCustomSlug && (
                        <Input
                            placeholder="my-custom-alias"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            disabled={loading}
                        />
                    )}

                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? "Shortening..." : "Shorten URL"}
                    </Button>

                    {error && (
                        <p className="text-sm text-destructive font-medium">
                            {error}
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
