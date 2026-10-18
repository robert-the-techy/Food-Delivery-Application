function AdminRestaurants()
{
    return(
        <div className="bg-green-100 p-10">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-medium">Restaurants</p>
                    <p className="text-sm font-medium text-gray-500">Manage restaurant profiles, availability, and menus.</p>
                </div>
                <button className="flex justify-center items-center space-x-2 bg-green-700 text-white p-4 text-sm font-medium rounded-2xl cursor-pointer shadow-md">
                    <i className="fa-solid fa-plus"></i>
                    <p>Add restaurant</p>
                </button>
            </div>

            {/* STAT CARDS */}
            <div className="flex space-x-4 w-full mt-10">
                <div className="w-2/6 bg-white p-5 rounded-2xl flex justify-between items-center shadow-md">
                    <i className="fa-solid fa-award text-6xl text-green-700 my-auto"></i>
                    <div className="flex flex-col space-y-1">
                        <p className="text-lg font-medium text-green-700">Top rated this week</p>
                        <p className="text-sm font-bold">Hotel - Star Biriyani</p>
                        <p className="text-xs text-gray-500 font-medium">4.9 rating</p>
                        <p className="text-xs text-gray-500 font-medium">34 items</p>
                        <p className="text-xs text-gray-500 font-medium">210 orders today</p>
                    </div>
                </div>
                <div className="w-1/6 bg-white p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow-md">
                    <div className="text-blue-700 flex justify-between items-center">
                        <i className="fa-solid fa-store text-xl"></i>
                        <i className="fa-solid fa-circle-check text-lg"></i>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-3xl font-bold">358</p>
                        <p className="text-sm font-medium text-blue-700">Restaurants</p>
                    </div>
                </div>
                <div className="w-1/6 bg-white p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow-md">
                    <div className="text-green-700 flex justify-between items-center">
                        <i className="fa-solid fa-door-open text-xl"></i>
                        <span className="relative flex size-4 justify-center items-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-3xl font-bold">300</p>
                        <p className="text-sm font-medium text-green-700">Opened</p>
                    </div>
                </div>
                <div className="w-1/6 bg-white p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow-md">
                    <div className="text-red-600 flex justify-between items-center">
                        <i className="fa-solid fa-door-closed text-xl"></i>
                        <i className="fa-solid fa-circle-xmark text-lg"></i>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-3xl font-bold">55</p>
                        <p className="text-sm font-medium text-red-600">Closed</p>
                    </div>
                </div>
                <div className="w-1/6 bg-white p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow-md">
                    <div className="text-yellow-700 flex justify-between items-center">
                        <i className="fa-solid fa-shop-slash text-xl"></i>
                        <i className="fa-solid fa-toggle-off text-xl"></i>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-3xl font-bold">3</p>
                        <p className="text-sm font-medium text-yellow-700">Inactive</p>
                    </div>
                </div>
            </div>

            {/* SEARCH + FILTERS */}
            <div className="flex justify-between items-center mt-10">
                <div className="flex items-center space-x-3 text-sm font-medium">
                    <button className="bg-green-600 py-1 px-5 rounded-full text-white shadow-md cursor-pointer">All</button>
                    <button className="bg-white py-1 px-5 rounded-full text-gray-500 shadow-md cursor-pointer">Open now</button>
                    <button className="bg-white py-1 px-5 rounded-full text-gray-500 shadow-md cursor-pointer">Top rated</button>
                    <button className="bg-white py-1 px-5 rounded-full text-gray-500 shadow-md cursor-pointer">Closed</button>
                    <button className="bg-white py-1 px-5 rounded-full text-gray-500 shadow-md cursor-pointer">Inactive</button>
                </div>
                <div className="flex justify-center items-center space-x-2 bg-white p-3 rounded-2xl w-1/4 text-green-700 text-sm shadow-md">
                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                    <input type="text" placeholder="search restaurant id or name" className="outline-none w-full"/>
                </div>
            </div>

            {/* RESTAURANT GRID */}
            <div className="grid grid-cols-4 mt-5 gap-3">
                <div className="bg-white rounded-2xl p-5 shadow-md">
                    <div className="bg-[url(/restaurant-images/hotel-star-biriyani.png)] bg-cover bg-center w-full h-30 relative rounded-t-2xl">
                        <p className="text-xs font-medium bg-green-100 inline p-1 rounded-full text-green-700 absolute right-2 top-2">Open</p>
                    </div>
                    <div className="flex flex-col space-y-2 mt-3">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-bold text-green-700">RS813</p> {/* Restaurant code */}
                            <p className="text-sm font-bold">Hotel - Star Biriyani</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-star"></i> 4.7</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-utensils"></i> Biriyani &middot; Tandoori</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-location-dot"></i> Velachery, Chennai</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-xs font-medium"><i className="fa-solid fa-bars"></i> 35 menu items</p>
                            <button className="text-xs text-green-700 font-bold cursor-pointer hover:bg-green-200 rounded-full p-1 transition duration-300">Manage</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-md">
                    <div className="bg-[url(/restaurant-images/hotel-star-biriyani.png)] bg-cover bg-center w-full h-30 relative rounded-t-2xl">
                        <p className="text-xs font-medium bg-green-100 inline p-1 rounded-full text-green-700 absolute right-2 top-2">Open</p>
                    </div>
                    <div className="flex flex-col space-y-2 mt-3">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-bold">Hotel - Star Biriyani</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-star"></i> 4.7</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-utensils"></i> Biriyani &middot; Tandoori</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-location-dot"></i> Velachery, Chennai</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-xs font-medium"><i className="fa-solid fa-bars"></i> 35 menu items</p>
                            <button className="text-xs text-green-700 font-bold cursor-pointer hover:bg-green-200 rounded-full p-1 transition duration-300">Manage</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-md">
                    <div className="bg-[url(/restaurant-images/hotel-star-biriyani.png)] bg-cover bg-center w-full h-30 relative rounded-t-2xl">
                        <p className="text-xs font-medium bg-green-100 inline p-1 rounded-full text-green-700 absolute right-2 top-2">Open</p>
                    </div>
                    <div className="flex flex-col space-y-2 mt-3">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-bold">Hotel - Star Biriyani</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-star"></i> 4.7</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-utensils"></i> Biriyani &middot; Tandoori</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-location-dot"></i> Velachery, Chennai</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-xs font-medium"><i className="fa-solid fa-bars"></i> 35 menu items</p>
                            <button className="text-xs text-green-700 font-bold cursor-pointer hover:bg-green-200 rounded-full p-1 transition duration-300">Manage</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-md">
                    <div className="bg-[url(/restaurant-images/hotel-star-biriyani.png)] bg-cover bg-center w-full h-30 relative rounded-t-2xl">
                        <p className="text-xs font-medium bg-green-100 inline p-1 rounded-full text-green-700 absolute right-2 top-2">Open</p>
                    </div>
                    <div className="flex flex-col space-y-2 mt-3">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-bold">Hotel - Star Biriyani</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-star"></i> 4.7</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-utensils"></i> Biriyani &middot; Tandoori</p>
                            <p className="text-xs font-medium text-gray-500"><i className="fa-solid fa-location-dot"></i> Velachery, Chennai</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-xs font-medium"><i className="fa-solid fa-bars"></i> 35 menu items</p>
                            <button className="text-xs text-green-700 font-bold cursor-pointer hover:bg-green-200 rounded-full p-1 transition duration-300">Manage</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminRestaurants;