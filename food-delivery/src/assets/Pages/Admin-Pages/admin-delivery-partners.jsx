import { useCallback, useEffect, useMemo, useState } from "react";
import { timeAgo } from "../../Components/All/time-modifier";
import { useTokenContext } from "../../Components/Contexts/TokenContext";
import AddressPopup from "../../Components/Pop-ups/Address-Popup";

const PAGE_SIZE = 5;

const statusStyle =
{
    ONLINE: "bg-green-200 text-green-700",
    OFFLINE: "bg-yellow-200 text-yellow-700",
    BLOCKED: "bg-red-200 text-red-700",
};

function formatDate(d)
{
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function AdminDeliveryPartners()
{
    const {accessToken} = useTokenContext();

    const [stats, setStats] = useState(null);
    const [partners, setPartners] = useState([]);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [now, setNow] = useState(new Date());
    const [lastUpdated, setLastUpdated] = useState(null);
    const [selected, setSelected] = useState(null);

     const loadPartners = useCallback(async () =>
    {
        setLoading(true);
        try
        {
            const res = await fetch("http://localhost:8080/api/delivery-partner-details",
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
            setPartners(data.rows ?? []);
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
            loadPartners();
        }
    },[loadPartners,accessToken]);

    useEffect(() =>
    {
        const t = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(t);
    }, []);

    const filtered = useMemo(() =>
    {
        const q = search.trim().toLowerCase();
        if (!q) return partners;
        return partners.filter(p => [p.partnerCode, p.partnerName, p.partnerEmail, p.partnerPhone, p.partnerRatings, p.partnerStatus].some(v => String(v ?? "").toLowerCase().includes(q)));
    }, [partners, search]);

    const canToggle = filtered.length > PAGE_SIZE;
    const visible = canToggle && !showAll ? filtered.slice(0, PAGE_SIZE) : filtered;

    const [addressPopup,setAddressPopup] = useState("popup-in");

    return(
        <div className="bg-green-100 p-10">

            { selected && ( <AddressPopup user={"Delivery_Partner"} details={selected} address_hide={()=>setAddressPopup("popup-in")} address_done={()=>{ if(addressPopup == "popup-in") setSelected(null); }} address_show={addressPopup}/> ) }

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-medium">Delivery partners</p>
                    <p className="text-gray-500">Track partner activity, deliveries, and account status.</p>
                </div>
                <div>
                    <button onClick={loadPartners} disabled={loading} className="flex justify-center items-center space-x-1 bg-green-700 p-3 rounded-2xl cursor-pointer text-white shadow-md">
                        <i className="fa-solid fa-rotate-right text-sm"></i>
                        <p>{loading ? "Refreshing..." : "Refresh"}</p>
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-5 mt-10 justify-between">
                <div className="bg-white p-5 rounded-full size-40 shadow-indigo-600 shadow-md flex flex-col justify-center items-center">
                    <i className="fa-solid fa-person-biking text-2xl text-indigo-600"></i>
                    <p className="font-bold text-4xl text-indigo-600 my-2">{stats?.totalPartners ?? 0}</p>
                    <p className="text-sm text-indigo-600 font-bold">Total partners</p>
                </div>
                <div className="bg-white p-5 rounded-full size-40 shadow-green-600 shadow-md flex flex-col justify-center items-center">
                    <i className="fa-solid fa-user-check text-xl text-green-600"></i>
                    <p className="font-bold text-4xl text-green-600 my-2">{stats?.onlinePartners ?? 0}</p>
                    <p className="text-sm text-green-600 font-bold">Online</p>
                </div>
                <div className="bg-white p-5 rounded-full size-40 shadow-yellow-600 shadow-md flex flex-col justify-center items-center">
                    <i className="fa-solid fa-user-slash text-xl text-yellow-600"></i>
                    <p className="font-bold text-4xl text-yellow-600 my-2">{stats?.offlinePartners ?? 0}</p>
                    <p className="text-sm text-yellow-600 font-bold">Offline</p>
                </div>
                <div className="bg-white p-5 rounded-full size-40 shadow-red-600 shadow-md flex flex-col justify-center items-center">
                    <i className="fa-solid fa-user-xmark text-xl text-red-600"></i>
                    <p className="font-bold text-4xl text-red-600 my-2">{stats?.blockedPartners ?? 0}</p>
                    <p className="text-sm text-red-600 font-bold">Blocked</p>
                </div>
            </div>
            
            <div className="flex justify-between items-center mt-10 mb-2 px-2">
                <div className="flex flex-col space-y-1">
                    <p className="font-bold text-sm">Delivery partners directory</p>
                    <p className="text-xs font-medium text-gray-500">
                        {partners.length} partners - Updated {lastUpdated ? timeAgo(lastUpdated, now) : "never"}
                    </p>
                </div>
                <div className="bg-white p-3 rounded-xl flex items-center space-x-2 w-1/3 shadow-md">
                    <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="outline-none w-full text-sm font-medium text-gray-500 placeholder:text-gray-400" placeholder="search partner code or name etc."/>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
                <table className="w-full mb-5">
                    <thead>
                        <tr className="text-gray-500 border-b-2 border-gray-200">
                            {["s.no","partner code","partner","ratings","status","joined","deliveries","vehicle","address"].map(h => (
                                <th key={h} className="text-xs font-medium text-gray-500 p-4 uppercase text-center">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible.length === 0 && (
                            <tr><td colSpan={9} className="text-center text-xs text-gray-400 p-6">No partners found</td></tr>
                        )}
                        {visible.map((p, i) => (
                            <tr key={p.partnerCode} className="border-gray-200 border-b-2">
                                <td className="text-xs font-medium p-4 text-center">{i + 1}</td>
                                <td className="text-xs font-medium text-blue-500 p-4 text-center">{p.partnerCode}</td>
                                <td className="text-xs font-bold p-4">
                                    <p className="text-black">{p.partnerName}</p>
                                    <p className="text-gray-500">{p.partnerEmail}</p>
                                    <p className="text-gray-500">{p.partnerPhone}</p>
                                </td>
                                <td className="text-xs font-bold p-4 text-center">{p.partnerRatings}</td>
                                <td className="text-xs p-4 text-center">
                                    <span className={`py-2 px-4 rounded-full font-medium capitalize ${statusStyle[p.partnerStatus] ?? "bg-gray-200 text-gray-700"}`}>
                                        {String(p.partnerStatus ?? "").toLowerCase()}
                                    </span>
                                </td>
                                <td className="text-xs font-medium text-gray-500 p-4 text-center">{formatDate(p.partnerJoinedDate)}</td>
                                <td className="text-xs font-bold p-4 text-center">{p.partnerDeliveries}</td>
                                <td className="text-xs font-bold p-4 text-center">{p.partnerVehicleType}</td>
                                <td className="text-xs p-4 text-center">
                                    <button onClick={() =>{ setSelected(p); setAddressPopup("popup-out");}} className="bg-green-700 text-white px-5 py-3 rounded-lg cursor-pointer font-medium">
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
                            Showing {visible.length} of {filtered.length} partners
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
export default AdminDeliveryPartners;