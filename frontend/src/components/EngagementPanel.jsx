// NEW FILE: EngagementPanel.jsx
export default function EngagementPanel({ active, hasResult }) {
    if (!active || hasResult) return null;

    return (
        <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">⏳ Working on your link…</h3>

            <ul className="text-sm space-y-2 text-muted-foreground">
                <li>🚀 Server waking up (free tier)</li>
                <li>🔗 Generating a unique short ID</li>
                <li>💾 Saving redirect securely</li>
            </ul>

            <div className="rounded-md bg-primary/5 p-3 text-sm">
                💡 First request is slow — future links are instant
            </div>

            <p className="text-xs text-center text-muted-foreground">
                Thanks for waiting 🙏 This keeps the app free
            </p>
        </div>
    );
}
