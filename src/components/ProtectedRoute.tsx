import { Navigate } from "react-router-dom";
import { useUserInfo } from "../store";

interface IProtectedRoute {
  children: React.ReactNode;
  redirectUrl?: string;
  requiredPermissions?: string[];
  loginRequired?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
  redirectUrl = "/login",
  requiredPermissions = [],
  loginRequired = true,
}) => {
  const userInfo = useUserInfo()

  const isAuthorized = userInfo?.isStaff || 
    (!loginRequired || 
     (userInfo && requiredPermissions.every(permission => userInfo.permissions?.includes(permission))));


  return isAuthorized ? <>{children}</> : <Navigate to={redirectUrl} />;
};

export default ProtectedRoute;
