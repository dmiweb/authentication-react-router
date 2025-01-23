import { FC, PropsWithChildren, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { isAuth } = useContext(AuthContext);


  if (!isAuth) {
    return <Navigate to="/" state={{ from: pathname }} />;
  }

  return children;
};

export default ProtectedRoute;