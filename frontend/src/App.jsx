import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import SuccessBanner from "@/components/SuccessBanner";
import EngagementPanel from "@/components/EngagementPanel";
import FreeTierNotice from "@/components/FreeTierNotice";

export default function App() {
    const [result, setResult] = useState(null);
    const [engaged, setEngaged] = useState(false);



    const [loading, setLoading] = useState(false);
    // const [result, setResult] = useState(null);

    const handleShorten = async (e) => {
        e.preventDefault();
        setLoading(true);   // 1. Shows the EngagementPanel
        setResult(null);

        // 2. FAKE A LONG DELAY (Testing only)
        // Remove the setTimeout wrap when you go to production
        setTimeout(async () => {
            // Your real fetch code here
            // const res = await fetch(...)
            setResult("https://short.ly/xyz"); // 3. Hides EngagementPanel
            setLoading(false);
        }, 20000); // Forces you to wait 20 seconds to see the terminal logs & zaps
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
                <FreeTierNotice />

                <UrlForm
                    onResult={setResult}
                    onSubmitStart={() => setEngaged(true)}
                />

                <EngagementPanel
                    active={engaged}
                    hasResult={!!result}
                />
            </div>

            <SuccessBanner
                shortUrl={result?.shortUrl}
                originalUrl={result?.originalUrl}
                onClose={() => {
                    setResult(null);
                    setEngaged(false);
                }}
            />
        </div>
    );
}
