function AdminPaymentsPayouts()
{
    return(
        <div className="bg-green-100 p-10">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium text-2xl">Payments & Payouts</p>
                    <p className="text-gray-500 text-sm">Track platform revenue, commissions, and partner payouts.</p>
                </div>
                <div>
                    <button className="flex justify-center items-center space-x-2 bg-green-700 text-white p-3 rounded-2xl cursor-pointer text-sm font-medium shadow-md">
                        <i className="fa-solid fa-money-bill-transfer"></i>
                        <p>Process payouts</p>
                    </button>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="flex space-x-3 my-10">
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-sack-dollar text-green-500 text-2xl"></i>
                        <p className="text-xs bg-green-200 p-1 rounded-full text-green-700 font-bold px-2">+8.4%</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">&#8377;3,45,800</p>
                    <p className="text-xs font-bold text-green-700">Revenue this month</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-hourglass-half text-xl text-orange-400"></i>
                        <p className="text-xs bg-orange-200 p-1 rounded-full text-orange-700 font-bold px-2">14 pending</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">&#8377;58,200</p>
                    <p className="text-xs font-bold text-orange-700">Pending payouts</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-store text-xl text-blue-500"></i>
                        <p className="text-xs bg-blue-200 p-1 rounded-full text-blue-700 font-bold px-2">42 restaurants</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">&#8377;2,10,500</p>
                    <p className="text-xs font-bold text-blue-700">Restaurant payouts</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-percent text-yellow-300 text-xl"></i>
                        <p className="text-xs bg-yellow-200 p-1 rounded-full text-yellow-700 font-bold px-2">avg 15%</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">&#8377;51,900</p>
                    <p className="text-xs font-bold text-yellow-700">Commission earned</p>
                </div>
            </div>

            {/* MAIN TABLE CARD */}
            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <p className="font-bold text-sm">Payout records</p>
                        <p className="text-xs font-medium text-gray-500">86 records - Updated just now</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-xl flex justify-between items-center space-x-1 w-1/3">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input type="text" className="outline-none w-full text-sm font-medium text-gray-500" placeholder="search payout id or partner name etc."/>
                    </div>
                </div>

                <table className="w-full my-5">
                    <tr className="border-t-2 border-gray-200 border-b-2 text-start">
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">s.no</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">payout id</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">recipient</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">type</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">gross amount</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">commission</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">net payout</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">date</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-center">status</th>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">1</td>
                        <td className="text-xs font-medium text-blue-500 p-3">PY9001</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">A2B</p>
                            <p className="text-gray-500">Adaiyar</p>
                        </td>
                        <td className="text-xs font-bold text-gray-500 p-3">Restaurant</td>
                        <td className="text-xs font-bold p-3">&#8377;42,000</td>
                        <td className="text-xs font-medium text-red-400 p-3">&#8377;6,300</td>
                        <td className="text-xs font-bold p-3">&#8377;35,700</td>
                        <td className="text-xs font-medium text-gray-500 p-3">10 Sep 2026</td>
                        <td className="text-xs text-green-600 p-3 text-center">
                            <p className="bg-green-200 p-1 rounded-full">paid</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">2</td>
                        <td className="text-xs font-medium text-blue-500 p-3">PY9002</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Karthick</p>
                            <p className="text-gray-500">Delivery partner</p>
                        </td>
                        <td className="text-xs font-bold text-gray-500 p-3">Delivery earning</td>
                        <td className="text-xs font-bold p-3">&#8377;6,400</td>
                        <td className="text-xs font-medium text-gray-400 p-3">&#8377;0</td>
                        <td className="text-xs font-bold p-3">&#8377;6,400</td>
                        <td className="text-xs font-medium text-gray-500 p-3">12 Sep 2026</td>
                        <td className="text-xs text-orange-600 p-3 text-center">
                            <p className="bg-orange-200 p-1 rounded-full">pending</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">3</td>
                        <td className="text-xs font-medium text-blue-500 p-3">PY9003</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Dominos</p>
                            <p className="text-gray-500">Velachery</p>
                        </td>
                        <td className="text-xs font-bold text-gray-500 p-3">Restaurant</td>
                        <td className="text-xs font-bold p-3">&#8377;68,500</td>
                        <td className="text-xs font-medium text-red-400 p-3">&#8377;10,275</td>
                        <td className="text-xs font-bold p-3">&#8377;58,225</td>
                        <td className="text-xs font-medium text-gray-500 p-3">13 Sep 2026</td>
                        <td className="text-xs text-yellow-600 p-3 text-center">
                            <p className="bg-yellow-200 p-1 rounded-full">processing</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">4</td>
                        <td className="text-xs font-medium text-blue-500 p-3">PY9004</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Akash</p>
                            <p className="text-gray-500">Delivery partner</p>
                        </td>
                        <td className="text-xs font-bold text-gray-500 p-3">Delivery earning</td>
                        <td className="text-xs font-bold p-3">&#8377;5,100</td>
                        <td className="text-xs font-medium text-gray-400 p-3">&#8377;0</td>
                        <td className="text-xs font-bold p-3">&#8377;5,100</td>
                        <td className="text-xs font-medium text-gray-500 p-3">14 Sep 2026</td>
                        <td className="text-xs text-red-600 p-3 text-center">
                            <p className="bg-red-200 p-1 rounded-full">failed</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">5</td>
                        <td className="text-xs font-medium text-blue-500 p-3">PY9005</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Anjappar</p>
                            <p className="text-gray-500">Vadapalani</p>
                        </td>
                        <td className="text-xs font-bold text-gray-500 p-3">Restaurant</td>
                        <td className="text-xs font-bold p-3">&#8377;29,300</td>
                        <td className="text-xs font-medium text-red-400 p-3">&#8377;4,395</td>
                        <td className="text-xs font-bold p-3">&#8377;24,905</td>
                        <td className="text-xs font-medium text-gray-500 p-3">15 Sep 2026</td>
                        <td className="text-xs text-green-600 p-3 text-center">
                            <p className="bg-green-200 p-1 rounded-full">paid</p>
                        </td>
                    </tr>
                </table>

                {/* FOOTER */}
                <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-400">Showing 5 of 86 payout records</p>
                    <button className="flex items-center justify-center text-green-600 cursor-pointer text-xs">
                        <p className="cursor-pointer">View all payouts</p>
                        <i className="fa-solid fa-arrow-turn-down cursor-pointer"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AdminPaymentsPayouts;