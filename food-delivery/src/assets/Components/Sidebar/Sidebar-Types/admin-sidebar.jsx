import { NavLink } from "react-router-dom";

function AdminSidebar()
{
    return(
        <div className="flex flex-col items-start p-2 w-full h-fit">
            <p className="font-bold text-2xl text-center my-3 mx-auto text-nowrap"><i className="fa-solid fa-user-tie"></i> Mealzo Admin</p>
           <NavLink to={'/admin/dashboard'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':'hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="ri-dashboard-horizontal-line"></i>
                <p>Dashboard</p>
           </NavLink>
            <NavLink to={'/admin/profile'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-user mt-1"></i>
                <p>Profile</p>
            </NavLink>
            <NavLink to={'/admin/liveorders'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-mortar-pestle mt-1"></i>
                <p>Live Orders</p>
            </NavLink>
            <NavLink to={'/admin/orderhistory'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="ri-history-fill"></i>
                <p>Order History</p>
            </NavLink>
            <NavLink to={'/admin/customers'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-people-group mt-1"></i>
                <p>Customers</p>
            </NavLink>
            <NavLink to={'/admin/deliverypartners'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-person-biking mt-1"></i>
                <p>Delivery Partners</p>
            </NavLink>
            <NavLink to={'/admin/restaurants'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-store mt-1"></i>
                <p>Restaurants</p>
            </NavLink>
            <NavLink to={'/admin/menumanagement'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="ri-menu-search-line"></i>
                <p>Menu Management</p>
            </NavLink>
            <NavLink to={'/admin/reviewsratings'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-ranking-star mt-1"></i>
                <p>Reviews & Ratings</p>
            </NavLink>
            <NavLink to={'/admin/reports'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-chart-line mt-1"></i>
                <p>Reports</p>
            </NavLink>
            <NavLink to={'/admin/staffmanagement'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-users mt-1"></i>
                <p>Staff Management</p>
            </NavLink>
            <NavLink to={'/admin/ticketscomplaints'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-circle-exclamation mt-1"></i>
                <p>Tickets & Complaints</p>
            </NavLink>
            <NavLink to={'/admin/paymentspayouts'} className={({isActive})=>isActive?'text-black shadow-lg bg-green-100 transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2':' hover:text-black transition duration-300 w-full p-2 my-1 text-start cursor-pointer rounded-md flex space-x-2'}>
                <i className="fa-solid fa-indian-rupee-sign mt-1"></i>
                <p>Payments & Payouts</p>
            </NavLink>
        </div>
    )
}
export default AdminSidebar;