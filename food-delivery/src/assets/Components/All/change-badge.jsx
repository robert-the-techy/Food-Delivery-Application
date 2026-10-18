export function ChangeBadge({ value, unit = "%", upIsGood = true })
{
    if(value == null || value == undefined)
    {
        return null;
    }

    const isUp = value > 0;
    const isDown = value < 0;
    const good = isUp ? upIsGood : isDown ? !upIsGood : null;

    const color = good === null ? "bg-gray-200" : good ? "bg-green-200" : "bg-red-200";

    return(
        <div className={`${color} rounded-full p-1 font-medium text-xs`}>
            {isUp ? "+":"-"}{value}{unit === "%" ? "%" : `${unit}`}
        </div>
    )
}

const STATUS_STYLES = 
{
    PLACED:           { label: "placed",      cls: "bg-yellow-200 text-yellow-600" },
    PREPARING:        { label: "preparing",   cls: "bg-green-200 text-green-600" },
    OUT_OF_DELIVERY: { label: "out of delivery",  cls: "bg-blue-200 text-blue-600" },
};

export function StatusBadge({ status, assigned }) 
{
    // placed + no partner shows as "unassigned"
    const s = status === "PLACED" && !assigned ? { label: "unassigned", cls: "bg-yellow-200 text-yellow-600" } : STATUS_STYLES[status] ?? { label: status?.toLowerCase(), cls: "bg-gray-200 text-gray-600" };
    return <p className={`${s.cls} p-1 rounded-full text-xs`}>{s.label}</p>;
}

export function Badge({ today, yesterday, color }) 
{
    let text;
    if (yesterday === 0) text = today === 0 ? "0%" : "new";
    else {
        const pct = ((today - yesterday) / yesterday) * 100;
        text = `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
    }
    return (
        <p className={`text-xs font-bold text-${color}-800 bg-${color}-200 py-1 px-2 rounded-full`}>
            {text}
        </p>
    );
}