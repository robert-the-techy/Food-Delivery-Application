import { useState } from "react";

function AdminReviewsRatings()
{
    const today = new Date().toISOString().split('T')[0];
    const [defaultDate,setDefaultDate] = useState(today);

    function datePick(e)
    {
        e.preventDefault();
        document.getElementById('datePicker').showPicker();
    }

    return(
        <div className="bg-green-100 p-10">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-medium">Reviews & ratings</p>
                    <p className="text-sm font-medium text-gray-500">Monitor and moderate customer reviews across your platform</p>
                </div>
                <div className="bg-green-700 text-white p-3 rounded-2xl cursor-pointer" onClick={datePick}>
                    <input type="date" id="datePicker" className="cursor-pointer text-sm font-medium [&::-webkit-calendar-picker-indicator]:invert outline-none hover:[&::-webkit-calendar-picker-indicator]:cursor-pointer" max={today} onChange={(e)=>setDefaultDate(e.target.value)} value={defaultDate}/>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="flex items-center space-x-5 mt-10">
                <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between space-y-3 w-1/5">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 font-medium">Total reviews</p>
                        <i className="fa-solid fa-feather-pointed text-xl text-blue-600"></i>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">1256</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between space-y-3 w-1/5">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 font-medium">Average</p>
                        <i className="fa-solid fa-star text-2xl text-pink-500"></i>
                    </div>
                    <p className="text-3xl font-bold text-pink-500">4.5</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between space-y-3 w-1/5">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 font-medium">Positive</p>
                        <i className="fa-solid fa-circle-plus text-2xl text-green-700"></i>
                    </div>
                    <p className="text-3xl font-bold text-green-700">79%</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between space-y-3 w-1/5">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 font-medium">Neutral</p>
                        <i className="fa-solid fa-face-meh text-2xl text-yellow-700"></i>
                    </div>
                    <p className="text-3xl font-bold text-yellow-700">11%</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between space-y-3 w-1/5">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 font-medium">Negative</p>
                        <i className="fa-solid fa-circle-minus text-2xl text-red-600"></i>
                    </div>
                    <p className="text-3xl font-bold text-red-600">10%</p>
                </div>
            </div>

            {/* RATING DISTRIBUTION */}
            <div className="bg-white p-5 mt-10 rounded-2xl shadow-md">
                <p className="text-sm font-bold mb-3">Rating distribution</p>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <p className="text-nowrap text-lg font-bold">5<i className="fa-solid fa-star text-sm ms-1"></i></p>
                        <div className="w-full h-5 bg-gray-200 mx-3 rounded-full">
                            <span className="h-full w-[79%] bg-green-800 flex rounded-full"></span>
                        </div>
                        <p className="text-lg font-bold">79%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-nowrap text-lg font-bold">4<i className="fa-solid fa-star text-sm ms-1"></i></p>
                        <div className="w-full h-5 bg-gray-200 mx-3 rounded-full">
                            <span className="h-full w-[37%] bg-green-500 flex rounded-full"></span>
                        </div>
                        <p className="text-lg font-bold">37%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-nowrap text-lg font-bold">3<i className="fa-solid fa-star text-sm ms-1"></i></p>
                        <div className="w-full h-5 bg-gray-200 mx-3 rounded-full">
                            <span className="h-full w-[11%] bg-yellow-400 flex rounded-full"></span>
                        </div>
                        <p className="text-lg font-bold">11%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-nowrap text-lg font-bold">2<i className="fa-solid fa-star text-sm ms-1"></i></p>
                        <div className="w-full h-5 bg-gray-200 mx-3 rounded-full">
                            <span className="h-full w-[25%] bg-red-500 flex rounded-full"></span>
                        </div>
                        <p className="text-lg font-bold">25%</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-nowrap text-lg font-bold">1<i className="fa-solid fa-star text-sm ms-1"></i></p>
                        <div className="w-full h-5 bg-gray-200 mx-3 rounded-full">
                            <span className="h-full w-[10%] bg-red-700 flex rounded-full"></span>
                        </div>
                        <p className="text-lg font-bold">10%</p>
                    </div>
                </div>
            </div>

            {/* REVIEW LIST */}
            <div className="mt-10">
                <div className="flex flex-col space-y-5">
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                        <div className="flex justify-between space-x-5 my-2">
                            <div>
                                <div className="size-fit border rounded-full p-0.5 border-blue-500">
                                    <p className="bg-linear-to-br from-blue-100 via-blue-500 to-blue-900 size-10 flex justify-center items-center rounded-full text-white font-medium">AK</p>
                                </div>
                            </div>
                            <div className="me-auto flex flex-col space-y-2">
                                <p className="text-xs font-medium text-gray-500"><span className="text-black text-sm">Arjun Kumar</span> on <span>Spice Garden</span></p>
                                <div className="text-yellow-500">
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star-half-stroke bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-regular fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                </div>
                                <p className="text-sm font-medium text-gray-500">Food arrived hot and packaging was neat. Loved the biryani.</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-700 bg-green-100 py-1 px-3 rounded-full">Published</p>
                            </div>
                        </div>
                        <span className="w-full bg-gray-200 flex h-0.5 rounded-full"></span>
                        <div className="flex justify-between items-center mt-3">
                            <p className="text-xs font-bold text-gray-500"><span>OR801</span> &middot; <span>2 days ago</span></p>
                            <div className="flex justify-center items-center text-xs font-bold space-x-3">
                                <button className="bg-red-300 text-red-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-reply"></i>
                                    <p>Reply</p>
                                </button>
                                <button className="bg-green-300 text-green-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-thumbtack"></i>
                                    <p>Pin</p>
                                </button>
                                <button className="bg-blue-300 text-blue-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-eye-slash"></i>
                                    <p>Hide</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                        <div className="flex justify-between space-x-5 my-2">
                            <div>
                                <div className="size-fit border rounded-full p-0.5 border-blue-500">
                                    <p className="bg-linear-to-br from-blue-100 via-blue-500 to-blue-900 size-10 flex justify-center items-center rounded-full text-white font-medium">AK</p>
                                </div>
                            </div>
                            <div className="me-auto flex flex-col space-y-2">
                                <p className="text-xs font-medium text-gray-500"><span className="text-black text-sm">Arjun Kumar</span> on <span>Spice Garden</span></p>
                                <div className="text-yellow-500">
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star-half-stroke bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-regular fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                </div>
                                <p className="text-sm font-medium text-gray-500">Food arrived hot and packaging was neat. Loved the biryani.</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-700 bg-green-100 py-1 px-3 rounded-full">Published</p>
                            </div>
                        </div>
                        <span className="w-full bg-gray-200 flex h-0.5 rounded-full"></span>
                        <div className="flex justify-between items-center mt-3">
                            <p className="text-xs font-bold text-gray-500"><span>OR801</span> &middot; <span>2 days ago</span></p>
                            <div className="flex justify-center items-center text-xs font-bold space-x-3">
                                <button className="bg-red-300 text-red-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-reply"></i>
                                    <p>Reply</p>
                                </button>
                                <button className="bg-green-300 text-green-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-thumbtack"></i>
                                    <p>Pin</p>
                                </button>
                                <button className="bg-blue-300 text-blue-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-eye-slash"></i>
                                    <p>Hide</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                        <div className="flex justify-between space-x-5 my-2">
                            <div>
                                <div className="size-fit border rounded-full p-0.5 border-blue-500">
                                    <p className="bg-linear-to-br from-blue-100 via-blue-500 to-blue-900 size-10 flex justify-center items-center rounded-full text-white font-medium">AK</p>
                                </div>
                            </div>
                            <div className="me-auto flex flex-col space-y-2">
                                <p className="text-xs font-medium text-gray-500"><span className="text-black text-sm">Arjun Kumar</span> on <span>Spice Garden</span></p>
                                <div className="text-yellow-500">
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-solid fa-star-half-stroke bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                    <i className="fa-regular fa-star bg-linear-to-br from-yellow-100 via-yellow-500 to-yellow-900 bg-clip-text text-transparent"></i>
                                </div>
                                <p className="text-sm font-medium text-gray-500">Food arrived hot and packaging was neat. Loved the biryani.</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-700 bg-green-100 py-1 px-3 rounded-full">Published</p>
                            </div>
                        </div>
                        <span className="w-full bg-gray-200 flex h-0.5 rounded-full"></span>
                        <div className="flex justify-between items-center mt-3">
                            <p className="text-xs font-bold text-gray-500"><span>OR801</span> &middot; <span>2 days ago</span></p>
                            <div className="flex justify-center items-center text-xs font-bold space-x-3">
                                <button className="bg-red-300 text-red-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-reply"></i>
                                    <p>Reply</p>
                                </button>
                                <button className="bg-green-300 text-green-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-thumbtack"></i>
                                    <p>Pin</p>
                                </button>
                                <button className="bg-blue-300 text-blue-700 flex justify-center items-center space-x-1 py-1 px-2 rounded-full cursor-pointer">
                                    <i className="fa-solid fa-eye-slash"></i>
                                    <p>Hide</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PAGINATION */}
                <div className="mt-10 flex justify-center items-center">
                    <div className="flex justify-center items-center space-x-3">
                        <button className="border-2 text-gray-500 text-xs p-2 cursor-pointer rounded">
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <p className="text-sm font-bold text-gray-500">Page 1 of 65</p>
                        <button className="border-2 text-gray-500 text-xs p-2 cursor-pointer rounded">
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminReviewsRatings;