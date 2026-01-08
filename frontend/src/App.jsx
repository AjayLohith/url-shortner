import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import SuccessBanner from "@/components/SuccessBanner";

export default function App() {
    const [result, setResult] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
                <UrlForm onResult={setResult} />
            </div>

            <SuccessBanner
                shortUrl={result?.shortUrl}
                originalUrl={result?.originalUrl}
                onClose={() => setResult(null)}
            />
        </div>
    );
}
