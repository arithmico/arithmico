import { Link } from "react-router-dom";
import ChevronRight from "../icons/chevron-right";

interface FooterExternalLinkProps {
  children: React.ReactNode;
  href: string;
}

function FooterExternalLink({ children, href }: FooterExternalLinkProps) {
  return (
    <li className="flex">
      <a className="flex items-center" href={href}>
        <ChevronRight className="w-4 h-4 fill-white/50" />
        {children}
      </a>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="mt-4 text-white/40 grid grid-cols-[1fr_1fr_auto] border-t border-t-white/5 px-32 pt-4 pb-8 w-full max-w-7xl">
      <div className="">
        <h2 className="font-semibold text-white/70 mb-1 text-lg">Apps</h2>
        <ul className="flex flex-col">
          <FooterExternalLink href="https://calc.arithmico.com">
            Arithmico <span className=" pl-1 text-white/50">Calc</span>
          </FooterExternalLink>
          <FooterExternalLink href="https://docs.arithmico.com">
            Arithmico <span className=" pl-1 text-white/50">Docs</span>
          </FooterExternalLink>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-white/70 mb-1 text-lg">Links</h2>
        <ul className="flex flex-col">
          <FooterExternalLink href="https://github.com/arithmico/arithmico">
            Github
          </FooterExternalLink>
          <Link className="text-white/40 flex items-center" to="/imprint">
            <ChevronRight className="w-4 h-4 fill-white/50" />
            Impressum
          </Link>
        </ul>
      </div>
      <div className="flex flex-col ml-auto text-white/40">
        <h2 className="font-semibold text-white/70 mb-1 text-lg">
          Rechtliches
        </h2>
        <span className="text-white/40 flex items-center">
          <span className="pt-0.5">&#169;</span>
          <span className="ml-1">
            {new Date().getFullYear()} Lennard Behrens
          </span>
        </span>
        <span>Lizenz: MIT</span>
      </div>
    </footer>
  );
}
