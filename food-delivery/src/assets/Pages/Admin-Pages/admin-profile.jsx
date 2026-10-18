import { use, useCallback, useEffect, useState } from "react";
import "../../CSS/tailwind.css"
import { useTokenContext } from "../../Components/Contexts/TokenContext";
import EditProfilePopup from "../../Components/Pop-ups/Edit-Profile-Popup";
import SurePopup from "../../Components/Pop-ups/Sure-Popup";
import OTPPopup from "../../Components/Pop-ups/OTP-Popup";
import ChangePasswordPopup from "../../Components/Pop-ups/Change-Password-Popup";
import LogoutPopup from "../../Components/Pop-ups/Logout-Popup";
import DeleteAccountPopup from "../../Components/Pop-ups/Delete-Account-Popup";

function AdminProfile()
{
    const [adminData,setAdminData] = useState({
        userCode: null,
        userName: null,
        userDateOfBirth:null,
        userEmail: null,
        userPhone: null,
        userRole: null,
        userAddress:null,
        userDetailsUpdatedDate:null,
        userPasswordUpdatedDate:null,
        userLoggedInDate:null,
        userLoggedOutDate:null
    });

    function getInitials(name)
    {
        if(!name || name.trim() === '')
        {
            return '';
        }

        const words = name.trim().split(/\s+/);

        if(words.length === 1)
        {
            return words[0].slice(0,2).toUpperCase();
        }
        else
        {
            return (words[0][0] + words[words.length-1][0]).toUpperCase();
        }
    }

    const {accessToken} = useTokenContext();

    const getAdminDetails = useCallback(async ()=>
    {
        try
        {
            const response = await fetch(`http://localhost:8080/api/profile/admin/${localStorage.getItem("adminCode")}`,
            {
                method:"POST",
                headers:
                {
                    "Authorization":`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                }
            }
            )

            if(response.ok)
            {
                const data = await response.json();
                setAdminData(data);
            }
            else
            {
                console.error("Profile request failed:", response.status);
            }
        }
        catch(err)
        {
            console.error(err);
        }
    },[accessToken]);

    useEffect(()=>
    {
        getAdminDetails();
    },[getAdminDetails]);

    const [popup,setPopup] = useState("popup-up");
    const [surePopup,setSurePopup] = useState("popup-in");
    const [otpPopup,setOTPPopup] = useState("popup-in");
    const [changePopup,setChangePopup] = useState("popup-in");
    const [logoutPopup,setLogoutPopup] = useState("popup-in");
    const [deletePopup,setDeletePopup] = useState("popup-in");

    function OTPShow()
    {
        setSurePopup("popup-in");
        setOTPPopup("popup-out");
    }

    function ChangeShow()
    {
        setOTPPopup("popup-in");
        setChangePopup("popup-out");
    }

    return(
        <div className="w-full h-fit p-10 bg-green-100">

            {adminData.userCode && popup == "popup-down" && ( <EditProfilePopup popup_show={popup} popup_hide={()=>setPopup("popup-up")} adminDetails={adminData} onSaved={getAdminDetails}/> )}

            {adminData.userCode && surePopup == "popup-out" && ( <SurePopup sure_show={surePopup} sure_hide={()=>setSurePopup("popup-in")} otp_popup={OTPShow}/> )}

            {adminData.userCode && otpPopup == "popup-out" && ( <OTPPopup otp_show={otpPopup} otp_hide={()=>setOTPPopup("popup-in")} code={adminData?.userCode} change_show={ChangeShow}/> )}

            {adminData.userCode && changePopup == "popup-out" && ( <ChangePasswordPopup change_show={changePopup} change_hide={()=>setChangePopup("popup-in")} code={adminData?.userCode} email={adminData?.userEmail} onSaved={getAdminDetails}/> )}

            {adminData.userCode && logoutPopup == "popup-out" && ( <LogoutPopup logout_show={logoutPopup} logout_hide={()=>setLogoutPopup("popup-in")} code={adminData?.userCode}/> )}

            {adminData.userCode && deletePopup == "popup-out" && ( <DeleteAccountPopup delete_show={deletePopup} delete_hide={()=>setDeletePopup("popup-in")} code={adminData?.userCode}/> )}

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-medium">My Profile</p>
                    <p className="text-gray-500">Manage your account and administrative details.</p>
                </div>
                <div className="flex justify-between items-center space-x-2">
                    <span className="relative flex size-3 justify-center items-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-gray-500">Last logged in <span className="text-green-600 font-bold">{adminData.userLoggedInDate}</span></p>
                </div>
            </div>
            <div className="bg-white h-fit w-full rounded-full shadow-xl p-6 flex space-x-6 justify-between items-center my-10">
                <div className="border-2 rounded-full p-1 border-green-200">
                    <div className="size-35 flex items-center bg-linear-to-br from-green-100 via-green-400 to-green-700 rounded-full justify-center">
                        <p className="text-6xl font-bold text-white">{getInitials(adminData.userName)}</p>
                    </div>
                </div>
                <div className="h-full flex flex-col items-start justify-center space-y-1">
                   <p className="text-2xl font-medium">{adminData.userName}</p>
                   <p className="text-gray-500 font-bold">{adminData.userCode}</p>
                   <p className="text-xl font-bold text-green-600">System administrator</p>
                   <p className="text-gray-500 text-sm"><i className="fa-regular fa-envelope"></i> {adminData.userEmail}</p>
                   <p className="text-gray-500 text-sm"><i className="fa-solid fa-phone"></i> +91 {adminData.userPhone}</p>
                </div>
                <div className="text-gray-500 flex flex-col text-sm space-y-2">
                    <div className="flex justify-start items-center space-x-1">
                        <i className="fa-solid fa-cake-candles mt-1"></i>
                        <p>{adminData.userDateOfBirth}</p>
                    </div>
                    <div className="flex justify-start items-start space-x-1 w-50">
                        <i className="fa-solid fa-location-dot mt-1"></i>
                        <p>
                            {
                                adminData.userAddress ?
                                adminData.userAddress && 
                                [
                                    adminData.userAddress.roomNo,
                                    adminData.userAddress.buildingName,
                                    adminData.userAddress.areaName,
                                    adminData.userAddress.cityName,
                                    adminData.userAddress.stateName,
                                    adminData.userAddress.pinCode,
                                ].filter(Boolean).join(", ")
                                : "N/A"
                            }
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2 me-5">
                    <button className="cursor-pointer bg-linear-to-br from-green-200 via-green-500 to-green-800 p-5 rounded-full text-white text-md shadow-md flex space-x-2" onClick={()=>setPopup("popup-down")}>
                        <i className="fa-solid fa-pen-to-square mt-1 text-lg"></i>
                        <p>Edit profile</p>
                    </button>
                    <p className="text-xs text-gray-500">Profile updated in <span className="text-green-600 font-bold">{adminData.userDetailsUpdatedDate}</span></p>
                </div>
            </div>
            <div className="w-full h-fit my-3 flex space-x-10">
                <div className="bg-white rounded-3xl p-10 shadow-xl w-1/3">
                    <p className="uppercase font-medium mb-5"><i className="fa-solid fa-business-time"></i> Work Information</p>
                    <div className="flex flex-col h-full items-start justify-between pb-10">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Department</p>
                            <p className="font-bold">Administration</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Company email</p>
                            <p className="font-bold">fooddeliverysite2026@fds.org.in</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Annual CTC</p>
                            <p className="font-bold">&#8377; 10,00,000</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white p-10 rounded-3xl shadow-xl w-1/3 justify-between">
                    <p className="uppercase font-medium mb-5"><i className="fa-solid fa-lock"></i> Security</p>
                    <p className="text-sm font-medium text-gray-500">Password : **********</p>
                    <button className="py-3 px-4 rounded-2xl text-white font-bold bg-linear-to-br from-green-200 via-green-500 to-green-800 text-sm cursor-pointer w-full" onClick={()=>setSurePopup("popup-out")}>Change password</button>
                    <div className="flex flex-col">
                        <p className="text-gray-500 text-xs">Password updated in,</p>
                        <p className="text-green-600 font-bold text-sm">{adminData.userPasswordUpdatedDate}</p>
                    </div>
                </div>
                <div className="flex flex-col bg-white p-10 rounded-3xl shadow-xl w-1/3">
                    <p className="uppercase font-medium mb-5"><i className="fa-solid fa-circle-user text-lg"></i> Account</p>
                    <div className="flex flex-col mb-5">
                        <p className="text-xs font-medium text-gray-500">Last logged out,</p>
                        <span className="text-orange-500 font-bold text-sm">{adminData.userLoggedOutDate}</span>
                    </div>
                    <div className="flex space-y-5 flex-col">
                        <button onClick={()=>setLogoutPopup("popup-out")} className="text-sm text-white bg-linear-to-br from-orange-200 via-orange-500 to-orange-800 font-bold cursor-pointer w-full py-3 px-4 rounded-2xl"><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
                        <button onClick={()=>setDeletePopup("popup-out")} className="text-sm text-white bg-linear-to-br from-red-200 via-red-500 to-red-800 font-bold cursor-pointer w-full py-3 px-4 rounded-2xl"><i className="fa-solid fa-trash"></i> Delete account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminProfile;