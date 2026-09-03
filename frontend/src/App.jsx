import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import SuccessBanner from "@/components/SuccessBanner";
import FreeTierNotice from "@/components/FreeTierNotice";

export default function App() {
    const [result, setResult] = useState(null);

    return (
        <div className="min-h-screen bg-[#F0F2FF] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-xl space-y-6">
                <header className="text-center mb-8">
                    {/* Background box removed, just clean Inter Bold typography */}
                    <h1 className="text-6xl font-[900] tracking-tighter text-black uppercase">
                        SNAP<span className="text-[#6366F1]">LINK</span>
                    </h1>
                </header>

                <FreeTierNotice />

                <UrlForm
                    onResult={(res) => setResult(res)}
                    onSubmitStart={() => setResult(null)}
                />


            </div>

            {result && (
                <SuccessBanner
                    shortUrl={result?.shortUrl}
                    onClose={() => setResult(null)}
                />
            )}
        </div>
    );
}