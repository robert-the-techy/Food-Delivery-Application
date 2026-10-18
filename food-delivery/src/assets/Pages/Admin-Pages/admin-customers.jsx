import { useCallback, useEffect, useMemo, useState } from "react";
import { timeAgo } from "../../Components/All/time-modifier";
import { useTokenContext } from "../../Components/Contexts/TokenContext";
import AddressPopup from "../../Components/Pop-ups/Address-Popup";

const PAGE_SIZE = 5;

const statusStyle =
{
    ACTIVE: "bg-green-200 text-green-700",
    INACTIVE: "bg-yellow-200 text-yellow-700",
    BLOCKED: "bg-red-200 text-red-700",
};

function formatDate(d)
{
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function AdminCustomers()
{
    const {accessToken} = useTokenContext();

    const [stats, setStats] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [now, setNow] = useState(new Date());
    const [lastUpdated, setLastUpdated] = useState(null);
    const [selected, setSelected] = useState(null);

    const loadCustomers = useCallback(async () =>
    {
        setLoading(true);
        try
        {
            const res = await fetch("http://localhost:8080/api/customer-details",
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
            setCustomers(data.rows ?? []);
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
            loadCustomers();
        }
    },[loadCustomers,accessToken]);

    useEffect(() =>
    {
        const t = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(t);
    }, []);

    const filtered = useMemo(() =>
    {
        const q = search.trim().toLowerCase();
        if (!q) return customers;
        return customers.filter(c => [c.customerCode, c.customerName, c.customerEmail, c.customerPhone, c.customerLevel, c.customerStatus].some(v => String(v ?? "").toLowerCase().includes(q)));
    }, [customers, search]);

    const canToggle = filtered.length > PAGE_SIZE;
    const visible = canToggle && !showAll ? filtered.slice(0, PAGE_SIZE) : filtered;

    const [addressPopup,setAddressPopup] = useState("popup-in");

    return(
        <div className="bg-green-100 p-10 h-full">

            { selected && ( <AddressPopup user={"Customer"} details={selected} address_hide={()=>setAddressPopup("popup-in")} address_done={()=>{ if(addressPopup == "popup-in") setSelected(null); }} address_show={addressPopup}/> ) }

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-medium text-3xl">Customers</p>
                    <p className="text-gray-500 text-sm font-medium">Track customer activity, orders, and account status.</p>
                </div>
                <div>
                    <button onClick={loadCustomers} disabled={loading} className="flex justify-center items-center space-x-2 bg-green-700 text-white px-5 py-3 rounded-2xl cursor-pointer text-sm font-medium shadow-md">
                        <i className="fa-solid fa-rotate-right"></i>
                        <p>{loading ? "Refreshing..." : "Refresh"}</p>
                    </button>
                </div>
            </div>

            {/* Circular stat cards */}
            <div className="flex justify-between my-10">
                <div className="flex flex-col justify-center items-center size-40 rounded-full bg-linear-to-br from-indigo-100 to-indigo-400 border border-indigo-300 shadow-md">
                    <i className="fa-solid fa-user-group text-indigo-500 text-2xl"></i>
                    <p className="text-3xl font-bold mt-3">{stats?.totalCustomers ?? 0}</p>
                    <p className="text-sm font-medium text-indigo-600">Total customers</p>
                </div>
                <div className="flex flex-col justify-center items-center size-40 rounded-full bg-linear-to-br from-green-100 to-green-400 border border-green-300 shadow-md">
                    <i className="fa-solid fa-person-circle-check text-green-600 text-2xl"></i>
                    <p className="text-3xl font-bold mt-3">{stats?.activeCustomers ?? 0}</p>
                    <p className="text-sm font-medium text-green-600">Active</p>
                </div>
                <div className="flex flex-col justify-center items-center size-40 rounded-full bg-linear-to-br from-yellow-100 to-yellow-400 border border-yellow-300 shadow-md">
                    <i className="fa-solid fa-person-circle-exclamation text-yellow-600 text-2xl"></i>
                    <p className="text-3xl font-bold mt-3">{stats?.inactiveCustomers ?? 0}</p>
                    <p className="text-sm font-medium text-yellow-600">Inactive</p>
                </div>
                <div className="flex flex-col justify-center items-center size-40 rounded-full bg-linear-to-br from-red-100 to-red-400 border border-red-300 shadow-md">
                    <i className="fa-solid fa-person-circle-xmark text-red-600 text-2xl"></i>
                    <p className="text-3xl font-bold mt-3">{stats?.blockedCustomers ?? 0}</p>
                    <p className="text-sm font-medium text-red-600">Blocked</p>
                </div>
            </div>

            {/* Directory */}
            <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <p className="font-bold text-base">Customer directory</p>
                        <p className="text-xs font-medium text-gray-500">
                            {customers.length} customers - Updated {lastUpdated ? timeAgo(lastUpdated, now) : "never"}
                        </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl flex items-center space-x-2 w-1/3 shadow-md">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="outline-none w-full text-sm font-medium text-gray-500 placeholder:text-gray-400" placeholder="search customer code or name etc."/>
                    </div>
                </div>

                <table className="w-full my-5">
                    <thead>
                        <tr className="border-t-2 border-gray-200 border-b-2">
                            {["s.no","customer code","customer","level","status","joined","orders","spent","address"].map(h => (
                                <th key={h} className="text-xs font-medium text-gray-500 p-4 uppercase text-center">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.length === 0 && (
                            <tr><td colSpan={9} className="text-center text-xs text-gray-400 p-6">No customers found</td></tr>
                        )}
                        {visible.map((c, i) => (
                            <tr key={c.customerCode} className="border-gray-200 border-b-2">
                                <td className="text-xs font-medium p-4 text-center">{i + 1}</td>
                                <td className="text-xs font-medium text-blue-500 p-4 text-center">{c.customerCode}</td>
                                <td className="text-xs font-bold p-4">
                                    <p className="text-black">{c.customerName}</p>
                                    <p className="text-gray-500">{c.customerEmail}</p>
                                    <p className="text-gray-500">{c.customerPhone}</p>
                                </td>
                                <td className="text-xs font-bold p-4 text-center">{c.customerLevel}</td>
                                <td className="text-xs p-4 text-center">
                                    <span className={`py-2 px-4 rounded-full font-medium capitalize ${statusStyle[c.customerStatus] ?? "bg-gray-200 text-gray-700"}`}>
                                        {String(c.customerStatus ?? "").toLowerCase()}
                                    </span>
                                </td>
                                <td className="text-xs font-medium text-gray-500 p-4 text-center">{formatDate(c.customerJoinedDate)}</td>
                                <td className="text-xs font-bold p-4 text-center">{c.customerOrdersCount}</td>
                                <td className="text-xs font-bold p-4 text-center">&#8377;{Number(c.spent ?? 0).toLocaleString("en-IN")}</td>
                                <td className="text-xs p-4 text-center">
                                    <button onClick={() =>{ setSelected(c); setAddressPopup("popup-out"); }} className="bg-green-700 text-white px-5 py-3 rounded-lg cursor-pointer font-medium">
                                        view
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {canToggle && (
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-500">
                            Showing {visible.length} of {filtered.length} customers
                        </p>
                        <button onClick={() => setShowAll(s => !s)} className="flex items-center space-x-2 text-green-700 cursor-pointer text-sm">
                            <p>{showAll ? "View less" : "View all"}</p>
                            <i className={`fa-solid ${showAll ? "fa-arrow-turn-up" : "fa-arrow-turn-down"}`}></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default AdminCustomers;