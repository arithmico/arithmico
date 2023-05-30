import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";

export interface SimplePageProps {
  children: React.ReactNode;
  className?: string;
  isPublic?: boolean;
}

export function SimplePage({ children, className, isPublic }: SimplePageProps) {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isPublic) {
      return;
    }
    if (loggedIn) {
      return;
    }
    navigate("/login");
  }, [loggedIn, navigate, isPublic]);

  return (
    <div
      className={classNames(
        "absolute",
        "inset-0",
        "bg-neutral-200",
        "flex",
        "items-center",
        "justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
