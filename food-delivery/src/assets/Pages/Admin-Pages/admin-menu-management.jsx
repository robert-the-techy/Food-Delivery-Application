function AdminMenuManagement()
{
    return(
        <div className="bg-green-100 p-10">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-medium">Menu management</p>
                    <p className="text-sm font-medium text-gray-500">Add, edit, and organize food items for each restaurant — set prices, categories, images, and availability.</p>
                </div>
                <button className="flex justify-center items-center space-x-2 bg-green-700 text-white p-4 text-sm font-medium rounded-full cursor-pointer shadow-md">
                    <i className="fa-solid fa-plus"></i>
                    <p>Add items</p>
                </button>
            </div>

            {/* SEARCH + FILTERS */}
            <div className="flex items-center space-x-3 mt-10">
                <div className="flex justify-center items-center space-x-2 bg-white p-4 rounded-full w-2/5 text-green-700 text-sm shadow-md">
                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                    <input type="text" placeholder="search dishes" className="outline-none w-full"/>
                </div>
                <select className="outline-none text-sm bg-green-700 text-white rounded-full p-3 w-1/5 cursor-pointer">
                    <option>All categories</option>
                    <option>Starters</option>
                    <option>Main course</option>
                    <option>Desserts</option>
                    <option>Beverages</option>
                </select>
                <select className="outline-none text-sm bg-green-700 text-white rounded-full p-3 w-1/5 cursor-pointer">
                    <option>All status</option>
                    <option>Available</option>
                    <option>Out of stock</option>
                </select>
                <select className="outline-none text-sm bg-green-700 text-white rounded-full p-3 w-1/5 cursor-pointer">
                    <option>All restaurants</option>
                    <option>Star Biriyani</option>
                    <option>A2B</option>
                    <option>Dominos</option>
                    <option>Anjappar</option>
                </select>
            </div>

            {/* CATEGORY TABS */}
            <div className="flex justify-start text-sm space-x-3 my-6 font-medium text-gray-500">
                <button className="cursor-pointer py-1 px-4 rounded-full bg-green-700 text-white">All (120)</button>
                <button className="cursor-pointer py-1 px-4 rounded-full">Starter (32)</button>
                <button className="cursor-pointer py-1 px-4 rounded-full">Main courses (48)</button>
                <button className="cursor-pointer py-1 px-4 rounded-full">Desserts (18)</button>
                <button className="cursor-pointer py-1 px-4 rounded-full">Beverages (22)</button>
            </div>

            {/* MENU ITEMS GRID */}
            <div className="grid grid-cols-4 gap-3">
                <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col space-y-2">
                    <img src="/food-images/food-paneer-tikka.png" alt="Paneer tikka" className="h-32 w-full object-cover rounded-t-2xl"/>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">Paneer tikka</p>
                        <p className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">Available</p>
                    </div>
                    <p className="text-xs font-bold text-gray-500"><span>Star Biriyani</span> &middot; <span>Starter</span></p>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">&#8377;220</p>
                        <div className="flex justify-center items-center space-x-2">
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-pen-to-square text-green-700 cursor-pointer"></i>
                            </button>
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-trash text-red-700 cursor-pointer"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col space-y-2">
                    <img src="/food-images/food-paneer-tikka.png" alt="Paneer tikka" className="h-32 w-full object-cover rounded-t-2xl"/>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">Paneer tikka</p>
                        <p className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">Available</p>
                    </div>
                    <p className="text-xs font-bold text-gray-500"><span>Star Biriyani</span> &middot; <span>Starter</span></p>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">&#8377;220</p>
                        <div className="flex justify-center items-center space-x-2">
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-pen-to-square text-green-700 cursor-pointer"></i>
                            </button>
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-trash text-red-700 cursor-pointer"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col space-y-2 opacity-60">
                    <img src="/food-images/food-paneer-tikka.png" alt="Paneer tikka" className="h-32 w-full object-cover rounded-t-2xl"/>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">Paneer tikka</p>
                        <p className="text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded-full">Out of stock</p>
                    </div>
                    <p className="text-xs font-bold text-gray-500"><span>Star Biriyani</span> &middot; <span>Starter</span></p>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">&#8377;220</p>
                        <div className="flex justify-center items-center space-x-2">
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-pen-to-square text-green-700 cursor-pointer"></i>
                            </button>
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-trash text-red-700 cursor-pointer"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col space-y-2">
                    <img src="/food-images/food-paneer-tikka.png" alt="Paneer tikka" className="h-32 w-full object-cover rounded-t-2xl"/>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">Paneer tikka</p>
                        <p className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">Available</p>
                    </div>
                    <p className="text-xs font-bold text-gray-500"><span>Star Biriyani</span> &middot; <span>Starter</span></p>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">&#8377;220</p>
                        <div className="flex justify-center items-center space-x-2">
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-pen-to-square text-green-700 cursor-pointer"></i>
                            </button>
                            <button className="text-lg cursor-pointer">
                                <i className="fa-solid fa-trash text-red-700 cursor-pointer"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminMenuManagement;