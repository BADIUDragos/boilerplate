import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode;
  redirectUrl: string;
  requiredPermissions: string[] | null;
  loginRequired: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
  redirectUrl = "/login",
  requiredPermissions,
  loginRequired = true,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const isAuthorized =
    !loginRequired ||
    (userInfo &&
      (!requiredPermissions ||
        requiredPermissions.every((permission) =>
          userInfo.permissions?.includes(permission)
        )));

  return isAuthorized ? <>{children}</> : <Navigate to={redirectUrl} />;
};

export default ProtectedRoute;
