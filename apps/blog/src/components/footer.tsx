import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex items-baseline border-t border-t-white/5 pt-4 pb-8">
      <Link className="text-white/40" to="/imprint">
        Impressum
      </Link>
      <div className="flex flex-col ml-auto text-white/40 items-end">
        <span className="text-white/40 flex items-center">
          <span className="pt-0.5">&#169;</span>
          <span className="ml-1">
            {new Date().getFullYear()} Lennard Behrens
          </span>
        </span>
        <span> Lizenz: MIT</span>
      </div>
    </footer>
  );
}
