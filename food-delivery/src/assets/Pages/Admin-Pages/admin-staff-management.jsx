function AdminStaffManagement()
{
    return(
        <div className="bg-green-100 p-10">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium text-2xl">Staff Management</p>
                    <p className="text-gray-500 text-sm">Manage admin accounts, roles, and access permissions.</p>
                </div>
                <div>
                    <button className="flex justify-center items-center space-x-2 bg-green-700 text-white p-3 rounded-2xl cursor-pointer text-sm font-medium shadow-md">
                        <i className="fa-solid fa-user-plus"></i>
                        <p>Add staff</p>
                    </button>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="flex space-x-3 my-10">
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-users text-blue-500 text-2xl"></i>
                        <p className="text-xs bg-blue-200 p-1 rounded-full text-blue-700 font-bold px-2">+2 this month</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">18</p>
                    <p className="text-xs font-bold text-blue-700">Total staff</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-user-check text-green-500 text-xl"></i>
                        <p className="text-xs bg-green-200 p-1 rounded-full text-green-700 font-bold px-2">online now</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">14</p>
                    <p className="text-xs font-bold text-green-700">Active</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-user-clock text-yellow-300 text-xl"></i>
                        <p className="text-xs bg-yellow-200 p-1 rounded-full text-yellow-700 font-bold px-2">on leave</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">2</p>
                    <p className="text-xs font-bold text-yellow-700">On leave</p>
                </div>
                <div className="flex flex-col bg-white w-1/4 p-5 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center">
                        <i className="fa-solid fa-user-slash text-red-400 text-xl"></i>
                        <p className="text-xs bg-red-200 p-1 rounded-full text-red-700 font-bold px-2">disabled</p>
                    </div>
                    <p className="text-3xl font-bold mt-3">2</p>
                    <p className="text-xs font-bold text-red-700">Inactive</p>
                </div>
            </div>

            {/* MAIN TABLE CARD */}
            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <p className="font-bold text-sm">Staff directory</p>
                        <p className="text-xs font-medium text-gray-500">18 members - Updated just now</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-xl flex justify-between items-center space-x-1 w-1/3">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input type="text" className="outline-none w-full text-sm font-medium text-gray-500" placeholder="search staff id or name etc."/>
                    </div>
                </div>

                <table className="w-full my-5">
                    <tr className="border-t-2 border-gray-200 border-b-2 text-start">
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">s.no</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">staff id</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">name</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">role</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">department</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-start">joined</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-center">status</th>
                        <th className="text-xs font-medium text-gray-500 p-3 uppercase text-center">action</th>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">1</td>
                        <td className="text-xs font-medium text-blue-500 p-3">ABCD01</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Robert Simon Raj</p>
                            <p className="text-gray-500">robertsimonraj@gmail.com</p>
                        </td>
                        <td className="text-xs font-bold p-3">Super admin</td>
                        <td className="text-xs font-medium text-gray-500 p-3">Administration</td>
                        <td className="text-xs font-medium text-gray-500 p-3">11 Jan 2026</td>
                        <td className="text-xs text-green-600 p-3 text-center">
                            <p className="bg-green-200 p-1 rounded-full">active</p>
                        </td>
                        <td className="text-xs text-center p-3">
                            <i className="fa-solid fa-pen text-gray-400 cursor-pointer"></i>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">2</td>
                        <td className="text-xs font-medium text-blue-500 p-3">ABCD02</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Karthick</p>
                            <p className="text-gray-500">karthick@gmail.com</p>
                        </td>
                        <td className="text-xs font-bold p-3">Support staff</td>
                        <td className="text-xs font-medium text-gray-500 p-3">Customer care</td>
                        <td className="text-xs font-medium text-gray-500 p-3">02 Mar 2026</td>
                        <td className="text-xs text-green-600 p-3 text-center">
                            <p className="bg-green-200 p-1 rounded-full">active</p>
                        </td>
                        <td className="text-xs text-center p-3">
                            <i className="fa-solid fa-pen text-gray-400 cursor-pointer"></i>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">3</td>
                        <td className="text-xs font-medium text-blue-500 p-3">ABCD03</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Pooja</p>
                            <p className="text-gray-500">pooja@gmail.com</p>
                        </td>
                        <td className="text-xs font-bold p-3">Finance admin</td>
                        <td className="text-xs font-medium text-gray-500 p-3">Payments</td>
                        <td className="text-xs font-medium text-gray-500 p-3">18 May 2026</td>
                        <td className="text-xs text-yellow-600 p-3 text-center">
                            <p className="bg-yellow-200 p-1 rounded-full">on leave</p>
                        </td>
                        <td className="text-xs text-center p-3">
                            <i className="fa-solid fa-pen text-gray-400 cursor-pointer"></i>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">4</td>
                        <td className="text-xs font-medium text-blue-500 p-3">ABCD04</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Akash</p>
                            <p className="text-gray-500">akash@gmail.com</p>
                        </td>
                        <td className="text-xs font-bold p-3">Content moderator</td>
                        <td className="text-xs font-medium text-gray-500 p-3">Reviews</td>
                        <td className="text-xs font-medium text-gray-500 p-3">30 Jun 2026</td>
                        <td className="text-xs text-red-600 p-3 text-center">
                            <p className="bg-red-200 p-1 rounded-full">disabled</p>
                        </td>
                        <td className="text-xs text-center p-3">
                            <i className="fa-solid fa-pen text-gray-400 cursor-pointer"></i>
                        </td>
                    </tr>

                    <tr className="border-gray-200 border-b-2 text-start">
                        <td className="text-xs font-medium p-3">5</td>
                        <td className="text-xs font-medium text-blue-500 p-3">ABCD05</td>
                        <td className="text-xs font-medium p-3">
                            <p className="font-bold">Vasanth</p>
                            <p className="text-gray-500">vasanth@gmail.com</p>
                        </td>
                        <td className="text-xs font-bold p-3">Operations admin</td>
                        <td className="text-xs font-medium text-gray-500 p-3">Logistics</td>
                        <td className="text-xs font-medium text-gray-500 p-3">14 Aug 2026</td>
                        <td className="text-xs text-green-600 p-3 text-center">
                            <p className="bg-green-200 p-1 rounded-full">active</p>
                        </td>
                        <td className="text-xs text-center p-3">
                            <i className="fa-solid fa-pen text-gray-400 cursor-pointer"></i>
                        </td>
                    </tr>
                </table>

                {/* FOOTER */}
                <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-400">Showing 5 of 18 staff members</p>
                    <button className="flex items-center justify-center text-green-600 cursor-pointer text-xs">
                        <p className="cursor-pointer">View all staff</p>
                        <i className="fa-solid fa-arrow-turn-down cursor-pointer"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AdminStaffManagement;