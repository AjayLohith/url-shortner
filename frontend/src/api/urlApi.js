const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function shortenUrl(longUrl, customSlug) {
    const response = await fetch(`${BASE_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            url: longUrl,
            customSlug: customSlug || null,
        }),
    });

    const text = await response.text();

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error("Alias already in use. Try another one.");
        }

        if (response.status === 400) {
            throw new Error("Invalid alias format.");
        }

        throw new Error("Failed to shorten URL. Please try again.");
    }

    return text; // full short URL
}
