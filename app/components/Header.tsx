import { NavLink, Link } from "@remix-run/react";

const Header = () => {
  return (
    <header className="bg-black text-white  py-5  border-t-8 border-teal-500">
      <div className="container flex justify-between">
        <Link to="/">
          <h1 className="uppercase font-bold">My blog</h1>
        </Link>
        <nav>
          <ul className="flex gap-3 font-bold uppercase text-sm">
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
