import img from '../../../Images/logo.png'
import img2 from '../../../Images/mealzo-logo.png'

function Logo()
{
    return(
        <div className='flex justify-center items-center cursor-pointer'>
            <img src={img2} alt='no-logo' className='h-20'/>
            <img src={img} alt='no-logo' className='w-20 h-20'/>
        </div>
    )
}
export default Logo;