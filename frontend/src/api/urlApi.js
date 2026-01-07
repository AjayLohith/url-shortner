const BASE_URL = "http://localhost:8080/api/v1";

export async function shortenUrl(longUrl) {
  const response = await fetch(`${BASE_URL}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: longUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to shorten URL");
  }

  return response.text();
}

export function buildShortUrl(code) {
  return `${BASE_URL}/${code}`;
}
