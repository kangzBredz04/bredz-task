import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import NavbarLink from "./NavbarLink";

function Header() {
  return (
    <header className="flex justify-between px-4 h-16 items-center flex-shrink-0 shadow-md">
      <Link to="/" className="flex gap-2 items-center text-lg font-bold">
        <IoRocket color="#63acff" size={24} />
        <h1 className="text-xl text-[#63acff] font-extrabold">BRED`Z TASK</h1>
      </Link>
      <nav className="flex items-stretch">
        <NavbarLink icon={<MdHome size={26} />} title="Beranda" to="/" />
        <NavbarLink icon={<FaTasks size={24} />} title="Tugas" to="/task" />
      </nav>
      <NavbarLink icon={<FiLogIn size={26} />} title="Login" />
    </header>
  );
}

export default Header;
