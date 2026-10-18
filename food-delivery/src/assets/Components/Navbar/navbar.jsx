import Logo from "./Inner-Navbar/logo";
import Search from "./Inner-Navbar/search";

function Navbar()
{
    return(
        <nav className="flex justify-between items-center px-6">
            <Logo/>
            <Search/>
        </nav>
    )
}
export default Navbar;