import { AlertCircle } from "lucide-react";

export default function FreeTierNotice() {
    return (
        <div className="bg-white border-[4px] rounded-xl border-black p-4 flex items-start gap-4 shadow-[6px_6px_0px_0px_rgba(255,49,49,1)]">
            <div className="bg-[#FF3131] border-[2px] border-black p-1">
                <AlertCircle className="size-6 text-white stroke-[3px]" />
            </div>
            <div>
                <p className="font-black uppercase text-xs leading-tight">
                    Render Free Tier Notice:
                </p>
                <p className="font-bold text-[11px] mt-1 italic">
                    The server sleeps when idle. First link might take 50s-1min to load bcoz hosted on free plan. Don't be mad.
                </p>
            </div>
        </div>
    );
}