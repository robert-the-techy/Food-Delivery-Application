export function timeAgo(placedAt, now) 
{
    const mins = Math.max(0, Math.floor((now - new Date(placedAt)) / 60000));
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
}

export function timeColor(placedAt, now) 
{
    const mins = (now - new Date(placedAt)) / 60000;
    return mins < 3 ? "text-blue-500" : mins < 10 ? "text-green-500" : "text-yellow-500";
}

export function formatTime(t) 
{
    if (!t) return "-";
    // works for "2026-10-05T14:50:00" or "14:50:00"
    const d = t.includes("T") ? new Date(t) : new Date(`1970-01-01T${t}`);
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}