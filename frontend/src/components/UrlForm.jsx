import { useState } from "react";
import { Link2, Wand2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { shortenUrl } from "@/api/urlApi";

export default function UrlForm({ onResult, onSubmitStart }) {
    const [url, setUrl] = useState("");
    const [customSlug, setCustomSlug] = useState("");
    const [useCustomSlug, setUseCustomSlug] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmitStart();
        setLoading(true);
        try {
            const res = await shortenUrl(url, useCustomSlug ? customSlug : null);
            onResult({ shortUrl: res, originalUrl: url });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[24px] overflow-hidden">
            <CardHeader className="border-b-[3px] border-black bg-white py-6">
                <CardTitle className="flex items-center gap-3 font-[800] text-2xl text-black">
                    <div className="bg-[#EEF2FF] p-2 rounded-xl border-2 border-black">
                        <Link2 className="size-6 text-[#6366F1]" />
                    </div>
                    Shorten Link
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        type="url"
                        placeholder="Paste your long URL here..."
                        className="border-[3px] border-black rounded-xl h-14 text-base font-bold placeholder:text-slate-400 focus-visible:ring-0 focus:bg-indigo-50/30 transition-colors"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setUseCustomSlug(!useCustomSlug)}
                        className={`px-4 py-2 font-extrabold text-xs flex items-center gap-2 border-[2px] border-black rounded-full transition-all active:scale-95 ${
                            useCustomSlug ? "bg-black text-white" : "bg-[#EEF2FF] text-black hover:bg-indigo-100"
                        }`}
                    >
                        <Wand2 className="size-3" /> CUSTOM ALIAS
                    </button>

                    {useCustomSlug && (
                        <Input
                            placeholder="my-custom-link"
                            className="border-[3px] border-black rounded-xl h-12 font-bold animate-in slide-in-from-top-2"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                        />
                    )}

                    <Button
                        className="w-full h-14 bg-[#6366F1] hover:bg-[#4F46E5] text-white border-[3px] border-black rounded-xl text-lg font-[800] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                        disabled={loading}
                    >
                        {loading ? "CRUNCHING..." : "GENERATE LINK"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}