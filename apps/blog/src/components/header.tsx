import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
  return (
    <li className="flex first:pl-2 first:rounded-l-full last:pr-2 last:rounded-r-full hover:bg-white/5">
      <NavLink
        end
        className={({ isActive }) =>
          `relative flex px-3 py-2 transition ${
            isActive ? "text-white" : "text-white/40"
          }`
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default function Header() {
  return (
    <header className="flex w-full justify-center mt-6 mb-16">
      <nav>
        <ul className="flex rounded-full text-sm font-medium border border-white/5 backdrop-blur bg-neutral-800 text-white ">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/articles">Artikel</NavItem>
          <NavItem to="/releases">Versionen</NavItem>
          <NavItem to="/team">Team</NavItem>
        </ul>
      </nav>
    </header>
  );
}
