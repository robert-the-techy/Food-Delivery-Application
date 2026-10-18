import { useNavigate } from "react-router-dom";

function Btn()
{
    const navigate = useNavigate();
    function getStarted(e)
    {
        e.preventDefault();

        if(document.cookie)
        {
            navigate("/signin");
        }
        else
        {
            alert("Accept cookies");
        }
    }
    return(
       <div>
            <button onClick={getStarted} className="bg-orange-400 py-3 px-8 cursor-pointer rounded-full text-xs font-extrabold text-black hover:bg-black hover:text-orange-400 transition duration-400 border">GET START</button>
       </div>
    )
}
export default Btn;