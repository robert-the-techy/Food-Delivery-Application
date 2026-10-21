import Welcome from "../Components/Home/welcom";
import Signin from "../Components/Home/signin";
import Login from "../Components/Home/login";
import OTP from "../Components/All/Verify/otp";
import Verification from "../Components/All/Verify/verification";
import Forgotpassword from "../Components/All/forgotpassword";
import {Routes,Route} from 'react-router-dom'
import partner1 from "../Images/partner1.png";
import partner2 from "../Images/partner2.png";

function Home()
{
    return(
        <div id="main-layout" className="relative h-full w-full flex items-center justify-center text-orange-400">
            <div>
                <Routes>
                    <Route index element={<Welcome/>}/>
                    <Route path="signin" element={<Signin/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="otp" element={<OTP/>}/>
                    <Route path="verifycode" element={<Verification/>}/>
                    <Route path="forgotpassword" element={<Forgotpassword/>}/>
                </Routes>
            </div>

            <img src={partner1} className={`absolute left-10 bottom-0 w-60 h-60`}/>
            <img src={partner2} className={`absolute right-10 bottom-0 w-40 h-40`}/>
        </div>
    )
}
export default Home;