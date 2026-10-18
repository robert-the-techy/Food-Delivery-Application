// Name Validation
export const nameValidate = (name)=>
{
    if(/^[A-Za-z\s]+$/.test(name) && name.trim()==name && name!='' && name.length>=3)
    {
        return "";
    }
    else
    {
        if(name=='')
        {
            return "empty";
        }
        else
        {
            if(/^[A-Za-z\s]+$/.test(name) == false)
            {
                return "* name can't have symbols/numbers!";
            }
            else if(name.trim()!=name)
            {
                return "* name can't have blank spaces!";
            }
            else if(name.length < 3)
            {
                return "* name should have more than 3 characters!";
            }
        }
    }
}

// Email Validation
export const emailValidate = (email)=>
{
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email==email.toLowerCase() && email!='' && /^[a-zA-Z0-9@.]*$/.test(email))
    {
        return "";
    }
    else
    {
        if(email=='')
        {
            return "empty";
        }
        else
        {
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false)
            {
                return "* invalid Email!";
            }
            else if(email!=email.toLowerCase())
            {
                return "* email can't have uppercase!";
            }
            else if(/^[a-zA-Z0-9@.]*$/.test(email) == false)
            {
                return "* email should have @ symbol only!";
            }
        }
    }
}

// Mobile Number Validation
export const mobileValidate = (mobile)=>
{
    let lenofno = String(mobile).length;
    if(lenofno == 10 && lenofno!="")
    {
        return "";
    }
    else if(lenofno == "")
    {
        return "empty";
    }
    else if(lenofno != "")
    {
        if(lenofno > 10 || lenofno < 10)
        {
            return "* mobile number should have 10 digits!";
        }
    }
}

// Role Validation
export const roleValidate = (role)=>
{
    if(role=="")
    {
        return "empty";
    }
    else
    {
        return "";
    }
}

// Password Validation
export const passValidate = (password,cpassword)=>
{
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(password) && /^\S+$/.test(password) && password!='' && password==password.trim() && (password.length >= 8 && password.length <= 20) && password==cpassword)
    {
        return "";
    }
    else
    {
        if(password == '')
        {
           return "empty";
        }
        else
        {
            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(password) == false)
            {
                return "* password not valid,try another!";
            }
            else if(/^\S+$/.test(password) == false || password!=password.trim())
            {
                return "* password can't have blank spaces!";
            }
            else if(password.length < 8 || password.length > 20)
            {
                return "* password have 8 to 20 characters only!";
            }
            else if(password!=cpassword)
            {
                return "* both passwords must same!";
            }
        }
    }
}
export const cpassValidate = (cpassword,password)=>
{
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(cpassword) && /^\S+$/.test(cpassword) && cpassword!='' && cpassword==cpassword.trim() && (cpassword.length >= 8 && cpassword.length <= 20) && cpassword==password)
    {
        return "";
    }
    else
    {
        if(cpassword == '')
        {
           return "empty";
        }
        else
        {
            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(cpassword) == false)
            {
                return "* password not valid,try another!";
            }
            else if(/^\S+$/.test(cpassword) == false || cpassword!=cpassword.trim())
            {
                return "* password can't have blank spaces!";
            }
            else if(cpassword.length < 8 || cpassword.length > 20)
            {
                return "* password have 8 to 20 characters only!";
            }
            else if(cpassword!=password)
            {
                return "* both passwords must same!";
            }
        }
    }
}

// Date of Birth Validation
export const dobValidate = (dobText)=>
{
    const todayText = new Date().toISOString().split('T')[0];

    const today = new Date(todayText);
    const dob = new Date(dobText);

    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))
    {
        age--;
    }

    if(dobText !== todayText && dobText !== "" && age >= 18)
    {
        return "";
    }
    else if(dobText == todayText || dobText == "")
    {
        return "empty";
    }
    else if(age < 18)
    {
        return "* age should be 18 years above!";
    }

    return "";
}

// Address Validation
export const roomNoValidate = (roomNo)=>
{
    if(roomNo == "")
    {
        return "empty";
    }
    else
    {
        return "";
    }
}
export const buildingNameValidate = (buildingName)=>
{
    if(buildingName == "")
    {
        return "empty";
    }
    else
    {
        return "";
    }
}
export const areaNameValidate = (areaName)=>
{
    if(areaName == "")
    {
        return "empty";
    }
    else
    {
        return "";
    }
}
export const cityNameValidate = (cityName)=>
{
    if(/^[A-Za-z\s]+$/.test(cityName) && cityName != "")
    {
        return "";
    }
    else
    {
        if(cityName == "")
        {
            return "empty";
        }
        else
        {
            if(/^[A-Za-z\s]+$/.test(cityName) == false)
            {
                return "* city name can't have symbols/numbers!";
            }
        }
    }
}
export const stateNameValidate = (stateName)=>
{
    if(/^[A-Za-z\s]+$/.test(stateName) && stateName != "")
    {
        return "";
    }
    else
    {
        if(stateName == "")
        {
            return "empty";
        }
        else
        {
            if(/^[A-Za-z\s]+$/.test(stateName) == false)
            {
                return "* state name can't have symbols/numbers!";
            }
        }
    }
}
export const pinCodeValidate = (pinCode) =>
{
    const pin = String(pinCode ?? "").trim();

    if(pin === "")
    {
        return "empty";
    }
    else if(!/^\d{6}$/.test(pin))
    {
        return "* pincode should have 6 digits!";
    }
    return "";
}