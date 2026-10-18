import { useState } from "react";
import "../../CSS/style.css"
import LoginErrors from "../Error-Message/login-errors"
import {nameValidate,emailValidate,mobileValidate,dobValidate,roomNoValidate,buildingNameValidate,areaNameValidate,cityNameValidate,stateNameValidate,pinCodeValidate} from "../../JS/validation"
import { useTokenContext } from "../Contexts/TokenContext";

function EditProfilePopup({popup_show,popup_hide,adminDetails,onSaved})
{
    const {accessToken} = useTokenContext();

    function datePick(e)
    {
        e.preventDefault();
        document.getElementById('datePicker').showPicker();
    }

    const today = new Date().toISOString().split('T')[0];

    function dateFormat(date)
    {
        if(!date)
        {
            return "";
        }

        const [dd,mm,yyyy] = date.split("-");
        return `${yyyy}-${mm}-${dd}`;
    }

    const [updatedName,setUpdatedName] = useState(adminDetails?.userName);
    const [updatedEmail,setUpdatedEmail] = useState(adminDetails?.userEmail);
    const [updatedPhone,setUpdatedPhone] = useState(adminDetails?.userPhone);
    const [updatedDOB,setUpdatedDOB] = useState(dateFormat(adminDetails?.userDateOfBirth));
    const [updatedRoomNo,setUpdatedRoomNo] = useState(adminDetails?.userAddress?.roomNo??"");
    const [updatedBuildingName,setUpdatedBuildingName] = useState(adminDetails?.userAddress?.buildingName??"");
    const [updatedAreaName,setUpdatedAreaName] = useState(adminDetails?.userAddress?.areaName??"");
    const [updatedCityName,setUpdatedCityName] = useState(adminDetails?.userAddress?.cityName??"");
    const [updatedStateName,setUpdatedStateName] = useState(adminDetails?.userAddress?.stateName??"");
    const [updatedPincode,setUpdatedPincode] = useState(adminDetails?.userAddress?.pinCode??"");

    function pinCodeSet(e)
    {
        const pinCode = e.target.value;
        if(pinCode.length <= 6)
        {
            setUpdatedPincode(pinCode);
        }
    }

    const [errorset,setErrorSet] = useState('');
    const [errorMessage,seterrorMessage] = useState('go-in');
    const [saving,setSaving] = useState(false);

    function updatedDetails(e)
    {
        e.preventDefault();

        const nameErrorMsg = nameValidate(updatedName);
        const emailErrorMsg = emailValidate(updatedEmail);
        const mobileErrorMsg = mobileValidate(updatedPhone);
        const dobErrorMsg = dobValidate(updatedDOB);
        const roomNoErrorMsg = roomNoValidate(updatedRoomNo);
        const buildingNameErrorMsg = buildingNameValidate(updatedBuildingName);
        const areaNameErrorMsg = areaNameValidate(updatedAreaName);
        const cityNameErrorMsg = cityNameValidate(updatedCityName);
        const stateNameErrorMsg = stateNameValidate(updatedStateName);
        const pincodeErrorMsg = pinCodeValidate(updatedPincode);

        if(nameErrorMsg=="" && emailErrorMsg=="" && mobileErrorMsg =="" && dobErrorMsg == "" && roomNoErrorMsg == "" && buildingNameErrorMsg == "" && areaNameErrorMsg == "" && cityNameErrorMsg == "" && stateNameErrorMsg == "" && pincodeErrorMsg == "")
        {
            saveDetails();
        }

        if(nameErrorMsg!="empty" && nameErrorMsg !="")
        {
            setErrorSet(nameErrorMsg);
            seterrorMessage('come-out');
        }
        else if(emailErrorMsg != "empty" && emailErrorMsg !="")
        {
            setErrorSet(emailErrorMsg);
            seterrorMessage('come-out');
        }
        else if(mobileErrorMsg != "empty" && mobileErrorMsg !="")
        {
            setErrorSet(mobileErrorMsg);
            seterrorMessage('come-out');
        }
        else if(dobErrorMsg != "empty" && dobErrorMsg !="")
        {
            setErrorSet(dobErrorMsg);
            seterrorMessage('come-out');
        }
        else if(buildingNameErrorMsg != "empty" && buildingNameErrorMsg !="")
        {
            setErrorSet(buildingNameErrorMsg);
            seterrorMessage('come-out');
        }
        else if(areaNameErrorMsg != "empty" && areaNameErrorMsg !="")
        {
            setErrorSet(areaNameErrorMsg);
            seterrorMessage('come-out');
        }
        else if(cityNameErrorMsg != "empty" && cityNameErrorMsg !="")
        {
            setErrorSet(cityNameErrorMsg);
            seterrorMessage('come-out');
        }
        else if(stateNameErrorMsg != "empty" && stateNameErrorMsg !="")
        {
            setErrorSet(stateNameErrorMsg);
            seterrorMessage('come-out');
        }
        else if(pincodeErrorMsg != "empty" && pincodeErrorMsg !="")
        {
            setErrorSet(pincodeErrorMsg);
            seterrorMessage('come-out');
        }
        else if(nameErrorMsg=="empty" || emailErrorMsg == "empty" || mobileErrorMsg == "empty" || dobErrorMsg == "empty"|| roomNoErrorMsg == "empty"|| buildingNameErrorMsg == "empty"|| areaNameErrorMsg == "empty"|| cityNameErrorMsg == "empty"|| stateNameErrorMsg == "empty"|| pincodeErrorMsg == "empty")
        {
            setErrorSet("* fields should not be empty!");
            seterrorMessage('come-out');
        }
    }

    async function saveDetails()
    {
        if(saving) return;
        setSaving(true);

        const details = 
        {
            userName: updatedName,
            userDateOfBirth: updatedDOB,
            userEmail: updatedEmail,
            userPhone: updatedPhone,
            userAddress:
            {
                roomNo: updatedRoomNo,
                buildingName: updatedBuildingName,
                areaName: updatedAreaName,
                cityName: updatedCityName,
                stateName: updatedStateName,
                pinCode: updatedPincode,
            }
        }

        try
        {
            const response = await fetch(`http://localhost:8080/api/profile/admin/updated-details/${localStorage.getItem("adminCode")}`,
            {
                method:"POST",
                headers:
                {
                    "Authorization":`Bearer ${accessToken}`,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(details),
            });

            if(response.ok)
            {
                await onSaved?.();
                popup_hide();
            }
            else
            {
                alert(response.status);
            }
        }
        catch(err)
        {
            alert(err);
        }
        finally
        {
            setSaving(false);
        }
    }

    return(
        <div className={`${popup_show} border-green-300 shadow-md rounded-lg box-border bg-white h-fit w-120 border px-10 pb-10`}>
            <button className="absolute -top-2 right-0 p-2" onClick={popup_hide}>
                <i className="ri-close-large-line text-green-300 text-sm font-extrabold cursor-pointer"></i>
            </button>

            <LoginErrors errorMsg={errorset} isVisible={errorMessage} closeError={()=>seterrorMessage('go-in')}/>

            <form className="w-full" onSubmit={updatedDetails}>
                <p className="text-green-700 text-2xl font-bold text-center my-3">Edit profile</p>
                <div className="flex flex-col">
                    <p className="text-sm text-green-700 font-bold mb-2">Personal details</p>
                    <div className="flex justify-between items-center w-full space-x-5 mb-5">
                        <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="ri-user-fill"></i>
                            <input  type="text" className="outline-none w-full text-xs" placeholder="name" onChange={(e)=>setUpdatedName(e.target.value)} value={updatedName}/>
                        </div>
                        <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="ri-mail-fill"></i>
                            <input type="email" className="outline-none w-full text-xs" placeholder="email" onChange={(e)=>setUpdatedEmail(e.target.value)} value={updatedEmail}/>
                        </div>
                    </div>
                     <div className="flex justify-between items-center w-full space-x-5 mb-5">
                        <div className="w-1/2 p-1 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="ri-phone-fill"></i>
                            <input type="number" onChange={(e)=>setUpdatedPhone(e.target.value)} value={updatedPhone} className="text-xs outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="phone"/>
                        </div>
                        <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md" onClick={datePick}>
                            <i className="fa-solid fa-cake-candles cursor-pointer"></i>
                            <input id="datePicker" max={today} type="date" onChange={(e)=>setUpdatedDOB(e.target.value)} value={updatedDOB} className="cursor-pointer w-full text-xs [&::-webkit-calendar-picker-indicator]:to-black outline-none hover:[&::-webkit-calendar-picker-indicator]:cursor-pointer"/>
                        </div>
                    </div>
                    <p className="text-sm text-green-700 font-bold mb-2">Address details</p>
                    <div className="flex justify-between items-center w-full space-x-5 mb-5">
                        <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="fa-solid fa-bed"></i>
                            <input type="text" className="text-xs outline-none w-full ms-0.5" placeholder="room no" onChange={(e)=>setUpdatedRoomNo(e.target.value)} value={updatedRoomNo}/>
                        </div>
                        <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="fa-solid fa-building"></i>
                            <input type="text" className="text-xs outline-none w-full" placeholder="building name" onChange={(e)=>setUpdatedBuildingName(e.target.value)} value={updatedBuildingName}/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full space-x-5 mb-5">
                        <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="fa-solid fa-location-arrow"></i>
                            <input type="text" className="text-xs outline-none w-full" placeholder="area name" onChange={(e)=>setUpdatedAreaName(e.target.value)} value={updatedAreaName}/>
                        </div>
                        <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="fa-solid fa-city"></i>
                            <input type="text" className="text-xs outline-none w-full ms-0.5" placeholder="city name" onChange={(e)=>setUpdatedCityName(e.target.value)} value={updatedCityName}/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full space-x-5 mb-5">
                        <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="fa-solid fa-flag"></i>
                            <input type="text" className="text-xs outline-none w-full ms-0.5" placeholder="state name" onChange={(e)=>setUpdatedStateName(e.target.value)} value={updatedStateName}/>
                        </div>
                        <div className="w-1/2 p-2 space-x-1 rounded-lg flex items-center bg-green-100 shadow-md">
                            <i className="fa-solid fa-location-dot"></i>
                            <input type="number" maxLength={6} onChange={pinCodeSet} value={updatedPincode} className="text-xs outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="pin code"/>
                        </div>
                    </div>
                    <button disabled={saving} className="text-sm flex justify-center items-center space-x-1 bg-green-700 text-white w-full p-2 cursor-pointer rounded-2xl" type="submit">
                        <i className="fa-solid fa-circle-check mt-1"></i>
                        <p>{saving ? "Saving..." : "Save"}</p>
                    </button>
                </div>
            </form>
        </div>
    )
}
export default EditProfilePopup;