import { useState,useEffect,useMemo } from "react";
import { formatTime } from "../../Components/All/time-modifier";
import { Badge } from "../../Components/All/change-badge"
import { useTokenContext } from "../../Components/Contexts/TokenContext";

const PAGE_SIZE = 5;

function AdminOrderHistory()
{
    const today = new Date().toISOString().split('T')[0];
    const [defaultDate, setDefaultDate] = useState(today);
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);

    const {accessToken} = useTokenContext();

    function datePick(e)
    {
        e.preventDefault();
        document.getElementById('datePicker').showPicker();
    }

    useEffect(() => 
    {
        async function getStats()
        {
            try
            {
                const response = await fetch("http://localhost:8080/api/order-history/stats",
                {
                    headers:
                    {
                        "Authorization":`Bearer ${accessToken}`,
                    }
                }
                );
                if(response.ok)
                {
                    const data = await response.json();
                    setStats(data);
                }
                else
                {
                    alert(response.status);
                }
            }
            catch(err)
            {
                alert(err);
            }
        }
        getStats();
    },[]);

    useEffect(() => 
    {
        async function getRows()
        {
            try
            {
                const response = await fetch(`http://localhost:8080/api/order-history/rows?date=${defaultDate}`,
                {
                    headers:
                    {
                        "Authorization":`Bearer ${accessToken}`,
                    }
                }
                );
                if(response.ok)
                {
                    const data = await response.json();
                    setOrders(data);
                }
                else
                {
                    alert(response.status);
                }
            }
            catch(err)
            {
                alert(err);
            }
        }
        getRows();
    },[defaultDate]);

    const filtered = useMemo(() => 
    {
        const q = search.trim().toLowerCase();
        if (!q) return orders;
        return orders.filter(o => [o.orderId,o.status,o.customerId,o.customerName,o.customerPhone,o.restaurantName,o.restaurantArea,o.amount,o.payment].some(v => String(v ?? "").toLowerCase().includes(q)));
    }, [orders, search]);

    const canToggle = filtered.length > PAGE_SIZE;
    const visible = canToggle && !showAll ? filtered.slice(0, PAGE_SIZE) : filtered;

    return(
        <div className="bg-green-100 p-10 h-full">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-medium">Order History</p>
                    <p className="text-sm text-gray-500 font-medium">View and track all past orders across Mealzo.</p>
                </div>
                <div className="bg-green-700 text-white p-3 rounded-2xl cursor-pointer" onClick={datePick}>
                    <input type="date" id="datePicker" className="cursor-pointer text-sm font-medium [&::-webkit-calendar-picker-indicator]:invert outline-none hover:[&::-webkit-calendar-picker-indicator]:cursor-pointer" max={today} onChange={(e)=>setDefaultDate(e.target.value)} value={defaultDate}/>
                </div>
            </div>

            <div className="flex items-center space-x-5 my-10">
                <div className="flex flex-col justify-center items-center shadow-md bg-linear-to-br from-yellow-100 via-yellow-400 to-yellow-700 rounded-full p-6 w-40 h-40 shrink-0">
                    <p className="text-2xl font-bold">{stats?.totalOrders ?? 0}</p>
                    <p className="text-sm font-medium">Total orders</p>
                    <div className="flex space-x-1 mt-2">
                        <p className="text-xs font-bold bg-green-600/70 text-white px-2 py-1 rounded-full text-center">{stats?.totalDelivered ?? 0} del</p>
                        <p className="text-xs font-bold bg-red-600/70 text-white px-2 py-1 rounded-full text-center">{stats?.totalCancelled ?? 0} can</p>
                    </div>
                </div>
                <div className="flex flex-col bg-white w-1/4 rounded-2xl p-5 shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-plate-wheat text-lg text-blue-800"></i>
                        <Badge today={stats?.todayOrders ?? 0} yesterday={stats?.yesterdayOrders ?? 0} color="blue" />
                    </div>
                    <p className="font-bold text-2xl mt-3">{stats?.todayOrders ?? 0}</p>
                    <p className="text-sm font-medium text-blue-800">Today orders</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 rounded-2xl p-5 shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-people-carry-box text-lg text-green-800"></i>
                        <Badge today={stats?.todayDelivered ?? 0} yesterday={stats?.yesterdayDelivered ?? 0} color="green" />
                    </div>
                    <p className="font-bold text-2xl mt-3">{stats?.todayDelivered ?? 0}</p>
                    <p className="text-sm font-medium text-green-800">Delivered today</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 rounded-2xl p-5 shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-regular fa-circle-xmark text-lg text-red-600"></i>
                        <Badge today={stats?.todayCancelled ?? 0} yesterday={stats?.yesterdayCancelled ?? 0} color="red" />
                    </div>
                    <p className="font-bold text-2xl mt-3">{stats?.todayCancelled ?? 0}</p>
                    <p className="text-sm font-medium text-red-600">Cancelled today</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <p className="font-bold text-sm">Order records</p>
                        <p className="text-xs font-medium text-gray-500">{orders.length} orders on {defaultDate}</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-xl flex justify-between items-center space-x-1 w-1/3 shadow-md">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="outline-none w-full text-sm font-medium text-gray-500" placeholder="search customer id or name etc."/>
                    </div>
                </div>
                <table className="w-full my-5">
                    <thead>
                        <tr className="border-t-2 border-gray-200 border-b-2 text-start">
                            {["s.no","order id","status","time","reason","customer","restaurant","amount","payment"].map(h => (
                                <th key={h} className="text-xs font-medium text-gray-500 p-3 uppercase text-start">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.length === 0 && (
                            <tr><td colSpan={9} className="text-center text-xs text-gray-400 p-6">No orders found</td></tr>
                        )}
                        {visible.map((o, i) => {
                            const delivered = o.status === "DELIVERED";
                            return (
                                <tr key={o.orderId} className="border-gray-200 border-b-2 text-start">
                                    <td className="text-xs font-medium p-3">{i + 1}</td>
                                    <td className="text-xs font-medium text-blue-500 p-3">{o.orderId}</td>
                                    <td className="text-xs p-3 text-center">
                                        <p className={`p-1 font-medium rounded-full ${delivered ? "text-green-600" : "text-red-500"}`}>
                                            {delivered ? "Delivered" : "Cancelled"}
                                        </p>
                                    </td>
                                    <td className="text-xs font-medium p-3 text-center">{formatTime(o.time)}</td>
                                    <td className="text-xs font-medium p-3 text-center text-red-500">
                                        {delivered
                                            ? <i className="fa-solid fa-circle-check text-lg text-green-500"></i>
                                            : <p>{o.reason}</p>}
                                    </td>
                                    <td className="text-xs font-medium p-3">
                                        <p className="font-bold">{o.customerName}</p>
                                        <p className="text-gray-500">{o.customerPhone}</p>
                                    </td>
                                    <td className="text-xs font-medium p-3">
                                        <p className="font-bold">{o.restaurantName}</p>
                                        <p className="text-gray-500">{o.restaurantArea}</p>
                                    </td>
                                    <td className="text-xs font-bold p-3">&#8377;{o.amount}</td>
                                    <td className="text-xs font-bold p-3">{o.payment}</td>
                                </tr>
                            );
                        })}
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
export default AdminOrderHistory;