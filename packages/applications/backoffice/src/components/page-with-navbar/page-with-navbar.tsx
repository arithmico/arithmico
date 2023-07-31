import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../icons/loading.icon";
import { RootState } from "../../store";
import { useGetSecurityAttributesQuery } from "../../store/api/resources/auth/auth.api";
import { Navbar } from "../navbar/navbar";

export interface PageWithNavbarProps {
  children?: React.ReactNode;
}

export function PageWithNavbar({ children }: PageWithNavbarProps) {
  const { isSuccess, data } = useGetSecurityAttributesQuery();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      return;
    }
    navigate("/login");
  }, [loggedIn, navigate]);

  if (!isSuccess) {
    return (
      <div className="absolute flex h-full w-full items-center justify-center border border-yellow-500">
        <LoadingIcon className="stroke-black/25" />
      </div>
    );
  }

  console.log(data);

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
      <Navbar securityAttributes={data.securityAttributes} />
      <div className={classNames("max-w-full", "overflow-x-hidden")}>
        <main
          className={classNames(
            "pr-8",
            "pb-8",
            "overflow-y-auto",
            "w-full",
            "max-w-full",
            "overflow-x-hidden",
            "flex",
            "flex-col",
            "h-full"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
