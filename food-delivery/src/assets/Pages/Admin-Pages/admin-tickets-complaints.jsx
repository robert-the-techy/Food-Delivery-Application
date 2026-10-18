function AdminTicketsComplaints()
{
    return(
        <div className="bg-green-100 p-10">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium text-2xl">Tickets & Complaints</p>
                    <p className="text-gray-500 text-sm">Track and resolve customer, restaurant, and delivery partner issues.</p>
                </div>
                <div>
                    <button className="flex justify-center items-center space-x-2 bg-green-700 text-white p-3 rounded-2xl cursor-pointer text-sm font-medium shadow-md">
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                        <p>Refresh tickets</p>
                    </button>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="flex space-x-3 my-10">
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-ticket text-blue-500 text-2xl"></i>
                        <p className="text-xs bg-blue-200 p-1 rounded-full text-blue-700 font-bold px-2">+9 today</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">62</p>
                    <p className="text-xs font-bold text-blue-700">Total tickets</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-circle-exclamation text-xl text-orange-400"></i>
                        <p className="text-xs bg-orange-200 p-1 rounded-full text-orange-700 font-bold px-2">needs reply</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">18</p>
                    <p className="text-xs font-bold text-orange-700">Open</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-spinner text-xl text-yellow-300"></i>
                        <p className="text-xs bg-yellow-200 p-1 rounded-full text-yellow-700 font-bold px-2">avg 6 hrs</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">27</p>
                    <p className="text-xs font-bold text-yellow-700">In progress</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-circle-check text-green-800 text-xl"></i>
                        <p className="text-xs bg-green-200 p-1 rounded-full text-green-700 font-bold px-2">this week</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">17</p>
                    <p className="text-xs font-bold text-green-700">Resolved</p>
                </div>
            </div>

            {/* MAIN TABLE CARD */}
            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <p className="font-bold text-sm">Ticket queue</p>
                        <p className="text-xs font-medium text-gray-500">62 tickets - Updated just now</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-xl flex justify-between items-center space-x-1 w-1/3">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input type="text" className="outline-none w-full text-sm font-medium text-gray-500" placeholder="search ticket id or customer name etc."/>
                    </div>
                </div>

                <table className="w-full my-5">
                    <tr className="border-t-2 border-gray-200 border-b-2 text-start">
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">s.no</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">ticket id</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">raised by</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">issue</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">priority</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">assigned to</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">raised</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-center">status</th>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">1</td>
                        <td className="text-xs font-medium text-blue-500 p-3">TK4501</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Robert Simon Raj</p>
                            <p className="text-gray-500">Customer</p>
                        </td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Wrong item delivered</p>
                            <p className="text-gray-500">Order OR802</p>
                        </td>
                        <td className="text-xs text-red-600 p-3">
                            <p className="bg-red-200 p-1 rounded-full text-center">high</p>
                        </td>
                        <td className="text-xs font-bold text-gray-400 p-3">Unassigned</td>
                        <td className="text-xs text-yellow-500 p-3">12 mins ago</td>
                        <td className="text-xs text-orange-600 p-3 text-center">
                            <p className="bg-orange-200 p-1 rounded-full">open</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">2</td>
                        <td className="text-xs font-medium text-blue-500 p-3">TK4502</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Vasanth</p>
                            <p className="text-gray-500">Customer</p>
                        </td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Late delivery refund</p>
                            <p className="text-gray-500">Order OR803</p>
                        </td>
                        <td className="text-xs text-yellow-600 p-3">
                            <p className="bg-yellow-200 p-1 rounded-full text-center">medium</p>
                        </td>
                        <td className="text-xs font-bold p-3">Pooja</td>
                        <td className="text-xs text-green-500 p-3">1 hr ago</td>
                        <td className="text-xs text-yellow-600 p-3 text-center">
                            <p className="bg-yellow-200 p-1 rounded-full">in progress</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">3</td>
                        <td className="text-xs font-medium text-blue-500 p-3">TK4503</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Karthick</p>
                            <p className="text-gray-500">Delivery partner</p>
                        </td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Payout not credited</p>
                            <p className="text-gray-500">Week 34 earnings</p>
                        </td>
                        <td className="text-xs text-red-600 p-3">
                            <p className="bg-red-200 p-1 rounded-full text-center">high</p>
                        </td>
                        <td className="text-xs font-bold p-3">Akash</td>
                        <td className="text-xs text-red-400 p-3">3 hrs ago</td>
                        <td className="text-xs text-yellow-600 p-3 text-center">
                            <p className="bg-yellow-200 p-1 rounded-full">in progress</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">4</td>
                        <td className="text-xs font-medium text-blue-500 p-3">TK4504</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">A2B - Adaiyar</p>
                            <p className="text-gray-500">Restaurant</p>
                        </td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Menu price mismatch</p>
                            <p className="text-gray-500">Reported by customer</p>
                        </td>
                        <td className="text-xs text-yellow-600 p-3">
                            <p className="bg-yellow-200 p-1 rounded-full text-center">medium</p>
                        </td>
                        <td className="text-xs font-bold p-3">Robert Simon Raj</td>
                        <td className="text-xs text-blue-500 p-3">yesterday</td>
                        <td className="text-xs text-green-600 p-3 text-center">
                            <p className="bg-green-200 p-1 rounded-full">resolved</p>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">5</td>
                        <td className="text-xs font-medium text-blue-500 p-3">TK4505</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Shiva</p>
                            <p className="text-gray-500">Customer</p>
                        </td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">App crash during payment</p>
                            <p className="text-gray-500">Order OR805</p>
                        </td>
                        <td className="text-xs text-gray-500 p-3">
                            <p className="bg-gray-200 p-1 rounded-full text-center">low</p>
                        </td>
                        <td className="text-xs font-bold text-gray-400 p-3">Unassigned</td>
                        <td className="text-xs text-yellow-500 p-3">30 mins ago</td>
                        <td className="text-xs text-orange-600 p-3 text-center">
                            <p className="bg-orange-200 p-1 rounded-full">open</p>
                        </td>
                    </tr>
                </table>

                {/* FOOTER */}
                <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-400">Showing 5 of 62 tickets</p>
                    <button className="flex items-center justify-center text-green-600 cursor-pointer text-xs">
                        <p className="cursor-pointer">View all tickets</p>
                        <i className="fa-solid fa-arrow-turn-down cursor-pointer"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AdminTicketsComplaints;