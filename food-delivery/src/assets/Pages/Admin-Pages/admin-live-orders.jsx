import { useCallback, useEffect, useMemo, useState } from "react";
import { ChangeBadge, StatusBadge } from "../../Components/All/change-badge";
import { timeAgo,timeColor } from "../../Components/All/time-modifier";
import { useTokenContext } from "../../Components/Contexts/TokenContext";

const PAGE_SIZE = 5;

function AdminLiveOrders()
{
    const {accessToken} = useTokenContext();

    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [now, setNow] = useState(new Date());
    const [lastUpdated, setLastUpdated] = useState(null);

    const loadOrders = useCallback(async () => 
    {
        setLoading(true);
        try
        {
            const res = await fetch("http://localhost:8080/api/live-orders",
                {
                    headers:
                    {
                        "Authorization":`Bearer ${accessToken}`,
                    }
                }
            );
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            const data = await res.json();
            const t = new Date();
            setStats(data.stats ?? null);
            setOrders(data.orders ?? []);
            setNow(t);
            setLastUpdated(t);
        }
        catch (e)
        {
            console.error(e);
        }
        finally
        {
            setLoading(false);
        }
    },[accessToken]);

    useEffect(() => 
    { 
        if(accessToken)
        {
            loadOrders(); 
        }
    },[loadOrders,accessToken]);

    useEffect(() => 
    {
        const t = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(t);
    }, []);

    const filtered = useMemo(() => 
    {
        const q = search.trim().toLowerCase();
        if (!q) return orders;
        return orders.filter(o => [o.orderId, o.customerName, o.customerPhone, o.restaurantName, o.restaurantArea, o.deliveryPartnerName, o.status, o.totalAmount].some(v => String(v ?? "").toLowerCase().includes(q)));
    }, [orders, search]);

    const canToggle = filtered.length > PAGE_SIZE;
    const visible = canToggle && !showAll ? filtered.slice(0, PAGE_SIZE) : filtered;

    return(
        <div className="bg-green-100 p-10 h-full">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center space-x-2">
                        <span className="relative flex size-4 justify-center items-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                        <p className="font-medium text-2xl">Live orders</p>
                    </div>
                    <p className="text-gray-500 text-sm">Monitor every active food order as it moves through your delivery flow.</p>
                </div>
                <div>
                    <button onClick={loadOrders} disabled={loading} className="flex justify-center items-center space-x-2 bg-green-700 text-white p-3 rounded-2xl cursor-pointer text-sm font-medium shadow-md">
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                        <p>{loading ? "Refreshing..." : "Refresh orders"}</p>
                    </button>
                </div>
            </div>
            <div className="flex space-x-3 my-10">
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md justify-between">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-toggle-on text-green-500 text-2xl"></i>
                        <ChangeBadge value={stats?.ordersDiff} unit=" today" />
                    </div>
                    <p className="text-3xl font-bold mt-3">{stats?.activeOrders ?? 0}</p>
                    <p className="text-xs font-bold text-green-700">Active orders</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md justify-between">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-circle-exclamation text-xl text-orange-400"></i>
                        <p className="text-xs bg-orange-200 p-1 rounded-full text-orange-700 font-bold px-2">assign partner</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">{stats?.unassignedCount ?? 0}</p>
                    <p className="text-xs font-bold text-orange-700">Unassigned</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md justify-between">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-mortar-pestle text-xl text-yellow-300"></i>
                        <p className="text-xs bg-yellow-200 p-1 rounded-full text-yellow-700 font-bold px-2">{stats?.preparingRestaurantCount ?? 0} restaurants</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">{stats?.preparingCount ?? 0}</p>
                    <p className="text-xs font-bold text-yellow-700">In preparing</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md justify-between">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-circle-check text-green-800 text-xl"></i>
                        {stats?.avgOutForDeliveryMinutes != null && 
                        (
                            <p className="text-xs bg-green-200 p-1 rounded-full text-green-700 font-bold px-2">
                                avg wait - {stats.avgOutForDeliveryMinutes} min
                            </p>
                        )}
                    </div>
                    <p className="text-3xl font-bold mt-3">{stats?.outForDeliveryCount ?? 0}</p>
                    <p className="text-xs font-bold text-green-700">Out of delivery</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <p className="font-bold text-sm">Live order queue</p>
                        <p className="text-xs font-medium text-gray-500">
                            {orders.length} active orders - Updated {lastUpdated ? timeAgo(lastUpdated, now) : "never"}
                        </p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-xl flex justify-between items-center space-x-1 w-1/3 shadow-md">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} className="outline-none w-full text-sm font-medium text-gray-500" placeholder="search order id or customer name etc."/>
                    </div>
                </div>

                <table className="w-full my-5">
                    <thead>
                        <tr className="border-t-2 border-gray-200 border-b-2">
                            {["s.no","order id","customer","restaurant","delivery partner","items","amount","placed"].map(h => (
                                <th key={h} className="text-xs font-medium text-gray-500 p-3 uppercase text-start">{h}</th>
                            ))}
                            <th className="text-xs font-medium text-gray-500 p-3 uppercase text-center">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible.length === 0 && (
                            <tr><td colSpan={9} className="text-center text-xs text-gray-400 p-6">No orders found</td></tr>
                        )}
                        {visible.map((o, i) => (
                            <tr key={o.orderId} className="border-gray-200 border-b-2">
                                <td className="text-xs font-medium p-3">{i + 1}</td>
                                <td className="text-xs font-medium text-blue-500 p-3">{o.orderId}</td>
                                <td className="text-xs font-medium p-3">
                                    <p className="font-bold">{o.customerName}</p>
                                    <p className="text-gray-500">{o.customerPhone}</p>
                                </td>
                                <td className="text-xs font-medium p-3">
                                    <p className="font-bold">{o.restaurantName}</p>
                                    <p className="text-gray-500">{o.restaurantArea}</p>
                                </td>
                                <td className={`text-xs font-bold p-3 ${o.deliveryPartnerName ? "" : "text-gray-400"}`}>
                                    {o.deliveryPartnerName ?? "Assign partner"}
                                </td>
                                <td className="text-xs font-bold text-gray-500 p-3">{o.itemCount}</td>
                                <td className="text-xs font-bold p-3">&#8377;{o.totalAmount}</td>
                                <td className={`text-xs p-3 ${timeColor(o.placedAt, now)}`}>{timeAgo(o.placedAt, now)}</td>
                                <td className="text-xs p-3 text-center">
                                    <StatusBadge status={o.status} assigned={!!o.deliveryPartnerName} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {canToggle && (
                    <div className="flex justify-between items-center">
                        <p className="text-xs font-medium text-gray-400">
                            Showing {visible.length} of {filtered.length} active orders
                        </p>
                        <button onClick={() => setShowAll(s => !s)} className="flex items-center space-x-1 text-green-600 cursor-pointer text-xs">
                            <p>{showAll ? "View only 5 orders" : "View all orders"}</p>
                            <i className={`fa-solid ${showAll ? "fa-arrow-turn-up" : "fa-arrow-turn-down"} cursor-pointer`}></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default AdminLiveOrders;