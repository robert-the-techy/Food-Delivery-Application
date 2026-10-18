import { useEffect, useCallback, useState, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./assets/Components/Navbar/navbar";
import Sidebar from "./assets/Components/Sidebar/sidebar";
import Home from "./assets/Pages/home";

import "./assets/CSS/style.css";

import { useTokenContext } from "./assets/Components/Contexts/TokenContext";
import { useLoginContext } from "./assets/Components/Contexts/LoginContext";
import { useCookieContext } from "./assets/Components/Contexts/CookieContext";

import AdminDashBoard from "./assets/Pages/Admin-Pages/admin-dashboard";
import AdminProfile from "./assets/Pages/Admin-Pages/admin-profile";
import AdminLiveOrders from "./assets/Pages/Admin-Pages/admin-live-orders";
import AdminOrderHistory from "./assets/Pages/Admin-Pages/admin-order-history";
import AdminCustomers from "./assets/Pages/Admin-Pages/admin-customers";
import AdminDeliveryPartners from "./assets/Pages/Admin-Pages/admin-delivery-partners";
import AdminRestaurants from "./assets/Pages/Admin-Pages/admin-restaurants";
import AdminMenuManagement from "./assets/Pages/Admin-Pages/admin-menu-management";
import AdminReviewsRatings from "./assets/Pages/Admin-Pages/admin-reviews-ratings";
import AdminReports from "./assets/Pages/Admin-Pages/admin-reports";
import AdminStaffManagement from "./assets/Pages/Admin-Pages/admin-staff-management";
import AdminTicketsComplaints from "./assets/Pages/Admin-Pages/admin-tickets-complaints";
import AdminPaymentsPayouts from "./assets/Pages/Admin-Pages/admin-payments-payouts";

import CookieBar from "./assets/Components/All/Cookie-Bar/cookie-bar";
import CookiePolicy from "./assets/Components/All/Cookie-Bar/cookie-policy";
import CookieCustomization from "./assets/Components/All/Cookie-Bar/cookie-customization";
import LoadingBar from "./assets/Components/All/Animations/loadingbar";

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const { accessToken, setAccessToken } = useTokenContext();
  const { showCookie, setShowCookie } = useCookieContext();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const didInit = useRef(false);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/refresh", {
        method: "POST",
        credentials: "include",
      },[setAccessToken,setIsLoggedIn]);

      if (!response.ok) {
        setAccessToken(null);
        setIsLoggedIn(false);
        return false;
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
      setIsLoggedIn(true);
      return true;
    } catch {
      setAccessToken(null);
      setIsLoggedIn(false);
      return false;
    }
  }, [setAccessToken, setIsLoggedIn]);

  // Initial auth and cookie consent check
  useEffect(() => {
    if(didInit.current) return;
    didInit.current = true;

    refreshToken().finally(()=> setAuthChecked(true));

    // Check if CookieValue is already set in document.cookie
    const cookies = document.cookie ? document.cookie.split(";") : [];
    const hasConsent = cookies.some((item) => {
      const [key, value] = item.trim().split("=");
      return key === "CookieValue" && (value === "Stored" || value === "Removed");
    });

    setShowCookie(!hasConsent);
  }, [refreshToken, setShowCookie]);

  // Token refresh interval (every 14 minutes)
  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 14);

    return () => clearInterval(interval);
  }, [accessToken, refreshToken]);

  if(!authChecked)
  {
    return <LoadingBar/>;
  }

  const isLoginPage =
    location.pathname === "/login" || location.pathname.startsWith("/authenticate");
  const showAdminLayout = isLoggedIn && !isLoginPage;

  return (
    <div className="h-dvh bg-amber-100 overflow-hidden flex flex-col">
      {showAdminLayout ? (
        <div className="flex flex-1 min-h-0 w-full">
          <Sidebar />
          <main className="flex-1 min-w-0 min-h-0 overflow-y-auto">
            <Routes>
              <Route path="/admin/dashboard" element={<AdminDashBoard />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/liveorders" element={<AdminLiveOrders />} />
              <Route path="/admin/orderhistory" element={<AdminOrderHistory />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/deliverypartners" element={<AdminDeliveryPartners />} />
              <Route path="/admin/restaurants" element={<AdminRestaurants />} />
              <Route path="/admin/menumanagement" element={<AdminMenuManagement />} />
              <Route path="/admin/reviewsratings" element={<AdminReviewsRatings />} />
              <Route path="/admin/staffmanagement" element={<AdminStaffManagement />} />
              <Route path="/admin/ticketscomplaints" element={<AdminTicketsComplaints />} />
              <Route path="/admin/paymentspayouts" element={<AdminPaymentsPayouts />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-1 min-h-0 overflow-y-auto">
            <Routes>
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/cookie-customization" element={<CookieCustomization />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </main>
          <CookieBar show={showCookie} />
        </>
      )}
    </div>
  );
}