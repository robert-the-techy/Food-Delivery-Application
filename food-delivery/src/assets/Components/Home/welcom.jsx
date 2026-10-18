import Btn from "../All/Buttons/btn"
import { useLoginContext } from "../Contexts/LoginContext";

function Welcome()
{
    const {isLoggedIn} = useLoginContext();
    return(
        <div className="flex flex-col justify-center items-center">
            <p className="text-9xl font-extrabold [text-shadow:1px_1px_2px_black,2px_2px_2px_black,3px_3px_2px_black,4px_4px_2px_black,5px_5px_2px_black,-0.5px_-0.5px_2px_black]">Mealzo</p>
            <p className="text-7xl leading-20 font-extrabold [text-shadow:1px_1px_2px_black,2px_2px_2px_black,3px_3px_2px_black,4px_4px_2px_black,5px_5px_2px_black,-0.5px_-0.5px_2px_black]">Your Cravings, Delivered.</p>
            <p className="text-xl leading-15 font-bold text-black">&ldquo;Good Food. Great Mood. Delivered Fast&rdquo;</p>
            {
                isLoggedIn?
                ''
                :
                (<Btn/>)
            }
        </div>
    )
}
export default Welcome;