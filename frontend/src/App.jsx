import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import SuccessBanner from "@/components/SuccessBanner";
import EngagementPanel from "@/components/EngagementPanel";
import FreeTierNotice from "@/components/FreeTierNotice";

export default function App() {
    const [result, setResult] = useState(null);
    const [engaged, setEngaged] = useState(false);

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
