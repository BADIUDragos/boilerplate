import { Navigate } from "react-router-dom";
import { useUserInfo } from "../store";

interface IProtectedRoute {
  children: React.ReactNode;
  redirectUrl?: string;
  requiredPermissions?: string[];
  admin?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
  redirectUrl = "/login",
  requiredPermissions = [],
  admin = false,
}) => {
  const userInfo = useUserInfo();

  const isAuthorized =
    (admin && userInfo?.isSuperuser) ||
    (userInfo &&
      requiredPermissions.every((permission) =>
        userInfo.permissions?.includes(permission)
      ));

  return isAuthorized ? <>{children}</> : <Navigate to={redirectUrl} />;
};

export default ProtectedRoute;
