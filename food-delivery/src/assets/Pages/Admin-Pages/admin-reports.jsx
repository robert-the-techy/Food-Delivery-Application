import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

function AdminReports()
{
    const revenueData = [
        { day: "Mon", revenue: 1200 },
        { day: "Tue", revenue: 1800 },
        { day: "Wed", revenue: 1500 },
        { day: "Thu", revenue: 2400 },
        { day: "Fri", revenue: 2100 },
        { day: "Sat", revenue: 3200 },
        { day: "Sun", revenue: 2800 },
    ];

    const ordersData = [
        { restaurant: "A2B", orders: 320 },
        { restaurant: "Dominos", orders: 275 },
        { restaurant: "Anjappar", orders: 210 },
        { restaurant: "Star Biriyani", orders: 190 },
        { restaurant: "Friends Hotel", orders: 150 },
    ];

    const statusData = [
        { name: "Delivered", value: 68, color: "#16a34a" },
        { name: "Cancelled", value: 8, color: "#dc2626" },
        { name: "In progress", value: 17, color: "#ca8a04" },
        { name: "Unassigned", value: 7, color: "#f97316" },
    ];

    const partnerData = [
        { partner: "Karthick", deliveries: 145 },
        { partner: "Akash", deliveries: 132 },
        { partner: "Pooja", deliveries: 118 },
        { partner: "Vikram", deliveries: 96 },
    ];

    return(
        <div className="bg-green-100 p-10">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium text-2xl">Reports</p>
                    <p className="text-gray-500 text-sm">Business insights across orders, revenue, and performance.</p>
                </div>
                <div>
                    <button className="flex justify-center items-center space-x-2 bg-green-700 text-white p-3 rounded-2xl cursor-pointer text-sm font-medium shadow-md">
                        <i className="fa-solid fa-download"></i>
                        <p>Export report</p>
                    </button>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="flex space-x-3 my-10">
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-sack-dollar text-green-500 text-2xl"></i>
                        <p className="text-xs bg-green-200 p-1 rounded-full text-green-700 font-bold px-2">+12.5%</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">&#8377;15,000</p>
                    <p className="text-xs font-bold text-green-700">Total revenue (week)</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-receipt text-blue-500 text-xl"></i>
                        <p className="text-xs bg-blue-200 p-1 rounded-full text-blue-700 font-bold px-2">+8.2%</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">1,145</p>
                    <p className="text-xs font-bold text-blue-700">Total orders (week)</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-clock text-xl text-yellow-300"></i>
                        <p className="text-xs bg-yellow-200 p-1 rounded-full text-yellow-700 font-bold px-2">-2 min</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">28 min</p>
                    <p className="text-xs font-bold text-yellow-700">Avg delivery time</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-circle-xmark text-red-400 text-xl"></i>
                        <p className="text-xs bg-red-200 p-1 rounded-full text-red-700 font-bold px-2">+1.1%</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">92</p>
                    <p className="text-xs font-bold text-red-700">Cancelled orders</p>
                </div>
            </div>

            {/* ROW 1: LINE + PIE */}
            <div className="flex space-x-3 mb-3">
                <div className="bg-white w-2/3 rounded-2xl shadow-md p-5">
                    <p className="font-bold text-sm mb-1">Weekly revenue</p>
                    <p className="text-xs font-medium text-gray-500 mb-3">Revenue trend for the last 7 days</p>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                            <XAxis dataKey="day" tick={{ fontSize: 12 }}/>
                            <YAxis tick={{ fontSize: 12 }}/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="revenue" stroke="#15803d" strokeWidth={3} dot={{ r: 4 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white w-1/3 rounded-2xl shadow-md p-5">
                    <p className="font-bold text-sm mb-1">Order status</p>
                    <p className="text-xs font-medium text-gray-500 mb-3">Distribution this week</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                                {statusData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col space-y-1 mt-2">
                        {statusData.map((s, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></span>
                                    <p className="text-gray-500 font-medium">{s.name}</p>
                                </div>
                                <p className="font-bold">{s.value}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ROW 2: BAR + BAR */}
            <div className="flex space-x-3">
                <div className="bg-white w-1/2 rounded-2xl shadow-md p-5">
                    <p className="font-bold text-sm mb-1">Top restaurants by orders</p>
                    <p className="text-xs font-medium text-gray-500 mb-3">This month</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={ordersData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                            <XAxis dataKey="restaurant" tick={{ fontSize: 11 }}/>
                            <YAxis tick={{ fontSize: 12 }}/>
                            <Tooltip/>
                            <Bar dataKey="orders" fill="#16a34a" radius={[6, 6, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white w-1/2 rounded-2xl shadow-md p-5">
                    <p className="font-bold text-sm mb-1">Top delivery partners</p>
                    <p className="text-xs font-medium text-gray-500 mb-3">Deliveries completed this month</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={partnerData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                            <XAxis dataKey="partner" tick={{ fontSize: 11 }}/>
                            <YAxis tick={{ fontSize: 12 }}/>
                            <Tooltip/>
                            <Bar dataKey="deliveries" fill="#2563eb" radius={[6, 6, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default AdminReports;