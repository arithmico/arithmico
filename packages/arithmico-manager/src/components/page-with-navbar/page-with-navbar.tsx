import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Navbar } from "../navbar/navbar";
import WithScrollbars from "../with-scrollbars/with-scrollbars";

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
        "gap-8",
        "overflow-hidden",
        "max-h-full",
        "h-full",
        "max-w-full",
        "w-full"
      )}
    >
      <Navbar />
      <div className={classNames("max-w-full", "overflow-x-hidden")}>
        <WithScrollbars>
          <main
            className={classNames(
              "pr-8",
              "pb-8",
              "overflow-y-auto",
              "w-full",
              "max-w-full",
              "overflow-x-hidden"
            )}
          >
            {children}
          </main>
        </WithScrollbars>
      </div>
    </div>
  );
}
