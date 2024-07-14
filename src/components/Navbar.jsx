import { NavLink } from "react-router-dom"
import Logo from "../assets/cc.ico"

const Navbar = () => {
  return (
    <nav className="h-[70px] flex justify-between items-center border-b-2 mb-12 border-b-gray-200">
        <div className="flex items-center gap-2">
            <img src={Logo} />
            <NavLink className="text-xl font-primaryMedium" to="/" >Captionizer</NavLink>
        </div>
        <a className="font-primaryLight" href="https://github.com/Ronit-02/Captionizer" >Github</a>
    </nav>
  )
}

export default Navbar