import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Navbar } from "../navbar/navbar";

export interface PageWithNavbarProps {
  children?: React.ReactNode;
}

export function PageWithNavbar({ children }: PageWithNavbarProps) {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      return;
    }
    navigate("/login");
  }, [loggedIn, navigate]);

  return (
    <div
      className={classNames(
        "absolute",
        "inset-0",
        "bg-neutral-200",
        "grid",
        "grid-cols-[80px_auto]",
        "gap-8"
      )}
    >
      <Navbar />
      <main>{children}</main>
    </div>
  );
}