import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import SuccessModal from "@/components/SuccessModal";
import { buildShortUrl } from "@/api/urlApi";

export default function App() {
  const [shortCode, setShortCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleResult = (code) => {
    setShortCode(code);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-primary/5 to-purple-500/10">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            URL Shortener
          </h1>
          <p className="mt-2 text-muted-foreground">
            Turn long links into clean, shareable URLs
          </p>
        </div>

        <UrlForm onResult={handleResult} />
      </div>

      {showModal && (
        <SuccessModal
          shortUrl={buildShortUrl(shortCode)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
