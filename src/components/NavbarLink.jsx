import { NavLink } from "react-router-dom";

function NavbarLink(props) {
  return (
    <NavLink
      to={props.to}
      className="w-32 flex items-center justify-center gap-2 box-border border-4 border-solid border-transparent text-[#63acff] hover:text-[#3d75b5]"
    >
      {props.icon}
      <h1 className="text-lg font-bold">{props.title}</h1>
    </NavLink>
  );
}

export default NavbarLink;
