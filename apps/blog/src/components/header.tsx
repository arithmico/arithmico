import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
  return (
    <li className="flex">
      <NavLink
        end
        className={({ isActive }) =>
          `relative flex px-3 py-2 transition ${
            isActive ? "text-teal-400" : "hover:text-teal-400"
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
        <ul className="flex rounded-full px-3 text-sm font-medium  ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/articles">Artikel</NavItem>
          <NavItem to="/releases">Versionen</NavItem>
          <NavItem to="/imprint">Impressum</NavItem>
        </ul>
      </nav>
    </header>
  );
}
