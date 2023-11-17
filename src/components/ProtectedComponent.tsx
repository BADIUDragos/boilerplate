import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProtectedComponent {
  children: React.ReactNode;
  requiredPermissions?: string[];
  loginRequired?: boolean;
}

const ProtectedComponent: React.FC<IProtectedComponent> = ({
  children,
  requiredPermissions = [],
  loginRequired = true,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const isAuthorized = userInfo?.isStaff || 
    (!loginRequired || 
     (userInfo && requiredPermissions.every(permission => userInfo.permissions?.includes(permission))));

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedComponent;