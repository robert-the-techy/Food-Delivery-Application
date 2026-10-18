import { useEffect, useState } from "react";
import WeeklyRevenueChart from "../../Components/All/Animations/weekly-revenue-chart"
import { useTokenContext } from "../../Components/Contexts/TokenContext";
import { formatINR } from "../../Components/All/FormatCurrency/formatINR"
import { ChangeBadge } from "../../Components/All/change-badge"

function AdminDashBoard()
{
    const today = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const {accessToken} = useTokenContext();

    const [data,setData] = useState(
        {
            ordersToday:0,
            ordersChange:null,
            revenueToday:0,
            liveOrders:0,
            avgDeliveryMinutes:0,
            avgChangeMinutes:null,
            cancelledToday:0,
            cancelledChange:null,
            delayedOrders:0,
            refundIssues:0,
            inactiveRestaurants:0,
            lowRated:0,
        }
    );

    useEffect(()=>
    {
        if(!accessToken) return;

        const fetchData = async ()=>
        {
            try
            {
                const response = await fetch("http://localhost:8080/api/dashboard/today",
                {
                    method:"POST",
                    headers:
                    {
                        "Authorization":`Bearer ${accessToken}`,
                        "Content-Type":"application/json",
                    }
                }
                );
                if(response.ok)
                {
                    const details = await response.json();
                    setData(details);
                }
                else
                {
                    alert("Something went wrong!");
                }
            }
            catch(err)
            {
                alert(err);
            }
        }

        fetchData();
    },[accessToken]);

    useEffect(() => 
    {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, "", window.location.href);
        };
        return () => { window.onpopstate = null; };
    }, []);

    return(
        <div className="bg-green-100 p-10">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-medium">Dashboard</p>
                    <p className="text-gray-500">Here&#39;s what&#39;s happening across Mealzo today.</p>
                </div>
               <div className="flex justify-center items-center space-x-1 bg-white p-3 rounded-2xl shadow-md">
                    <i className="fa-regular fa-calendar mt-1"></i>
                    <p className="font-medium text-gray-500">Today <span className="text-xl font-medium text-black">{today}</span></p>
               </div>
            </div>
            <div className="flex space-x-3 my-10 justify-center items-center">
                <div className="bg-white h-fit w-1/4 p-5 rounded-2xl space-y-5 shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-receipt text-2xl text-green-500"></i>
                        <ChangeBadge value={data.ordersChange} upIsGood={true}/>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold">{data.ordersToday}</p>
                        <p className="text-xs font-medium">Orders Today</p>
                    </div>
                </div>
                <div className="bg-white h-fit w-1/4 p-5 rounded-2xl space-y-5 shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-hand-holding-dollar text-lg text-yellow-600"></i>
                        <div className="bg-yellow-200 rounded-full py-1 px-2 font-medium text-xs">
                            {data.liveOrders} live
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold">{formatINR(data.revenueToday)}</p>
                        <p className="text-xs font-medium">Revenue Today</p>
                    </div>
                </div>
                <div className="bg-white h-fit w-1/4 p-5 rounded-2xl space-y-5 shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-regular fa-clock text-lg text-green-500"></i>
                        <ChangeBadge value={data.avgChangeMinutes} unit="min" upIsGood={false}/>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold">{data.avgDeliveryMinutes} min</p>
                        <p className="text-xs font-medium">Average delivery time</p>
                    </div>
                </div>
                <div className="bg-white h-fit w-1/4 p-5 rounded-2xl space-y-5 shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-ban text-lg text-red-600"></i>
                        <ChangeBadge value={data.cancelledChange} upIsGood={false}/>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold">{data.cancelledToday}</p>
                        <p className="text-xs font-medium">Cancelled orders</p>
                    </div>
                </div>
            </div>
            <div className="flex space-x-3">
                <div className="bg-white w-1/2 rounded-2xl shadow-md p-5">
                    <WeeklyRevenueChart />
                </div>
                <div className="w-1/2 bg-white p-5 shadow-md rounded-2xl">
                    <div className="space-y-5 overflow-y-scroll h-60 pe-5">
                        <div className="flex justify-between items-center w-full">
                            <p className="text-sm font-medium">Needs attention</p>
                            <i className="fa-solid fa-circle-exclamation text-yellow-500"></i>
                        </div>
                        <div className="w-full flex justify-between space-x-3 items-center">
                            <div className="text-green-800 bg-green-300 p-1 rounded-md">
                                <i className="fa-solid fa-hourglass-half text-lg"></i>
                            </div>
                            <div className="me-auto">
                                <p className="font-bold text-sm">Delayed orders</p>
                                <p className="text-gray-500 text-xs">Past estimated delivery time</p>
                            </div>
                            <div className="">
                                <p className="text-sm font-bold">{data.delayedOrders}</p>
                            </div>
                        </div>
                        <hr className="text-gray-300 my-3" />
                        <div className="w-full flex justify-between space-x-3 items-center">
                            <div className="text-green-800 bg-green-300 p-1 rounded-md">
                                <i className="fa-solid fa-circle-exclamation text-lg"></i>
                            </div>
                            <div className="me-auto">
                                <p className="font-bold text-sm">Refund or payment issues</p>
                                <p className="text-gray-500 text-xs">Resolve failed transactions</p>
                            </div>
                            <div className="">
                                <p className="text-sm font-bold">{data.refundIssues}</p>
                            </div>
                        </div>
                        <hr className="text-gray-300 my-3" />
                        <div className="w-full flex justify-between space-x-3 items-center">
                            <div className="text-green-800 bg-green-300 p-1 rounded-md">
                                <i className="fa-regular fa-bell-slash text-lg"></i>
                            </div>
                            <div className="me-auto">
                                <p className="font-bold text-sm">Restaurants offline or unresponsive</p>
                                <p className="text-gray-500 text-xs">Contact and restore service</p>
                            </div>
                            <div className="">
                                <p className="text-sm font-bold">{data.inactiveRestaurants}</p>
                            </div>
                        </div>
                        <hr className="text-gray-300 my-3" />
                        <div className="w-full flex justify-between space-x-3 items-center">
                            <div className="text-green-800 bg-green-300 p-1 rounded-md">
                            <i className="fa-solid fa-star-half-stroke text-lg"></i>
                            </div>
                            <div className="me-auto">
                                <p className="font-bold text-sm">Low-rated restaurants or riders</p>
                                <p className="text-gray-500 text-xs">Review performance</p>
                            </div>
                            <div className="">
                                <p className="text-sm font-bold">{data.lowRated}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminDashBoard;