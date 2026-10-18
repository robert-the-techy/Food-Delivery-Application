import "../../CSS/style.css"

function AddressPopup({user,details,address_show,address_hide,address_done})
{
    return(
        <div onAnimationEnd={address_done} className={`${address_show} bg-white border border-green-300 rounded-lg shadow-md px-8 pt-6 pb-8 w-96`}>
            <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-base text-green-700">{user} address</p>
                <i className="fa-solid fa-xmark text-green-300 cursor-pointer" onClick={address_hide}></i>
            </div>
            <p className="font-bold text-sm mt-3">{user == "Customer" ? details.customerName : details.partnerName}</p>
            <p className="text-xs text-gray-500 mb-4">{user == "Customer" ? details.customerCode : details.partnerCode}</p>
            {
                details?.userAddress ?
                (
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            ["Room no", details?.userAddress?.roomNo, "fa-bed"],
                            ["Building name", details?.userAddress?.buildingName, "fa-building"],
                            ["Area", details?.userAddress?.areaName, "fa-location-arrow"],
                            ["City", details?.userAddress?.cityName, "fa-city"],
                            ["State", details?.userAddress?.stateName, "fa-flag"],
                            ["Pin code", details?.userAddress?.pinCode, "fa-location-dot"],
                        ].map(([label, value, icon]) => (
                            <div key={label} className="bg-green-100 rounded-lg p-2 shadow-md">
                                <p className="text-[11px] text-green-700 font-medium">{label}</p>
                                <p className="text-xs flex items-center space-x-1.5">
                                    <i className={`fa-solid ${icon} text-green-600`}></i>
                                    <span>{value || "-"}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) :
                (
                    <p className="text-xs text-gray-400 text-center p-4">No address added</p>
                )
            }
        </div>
    )
}
export default AddressPopup;