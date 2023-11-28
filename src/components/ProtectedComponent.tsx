import { useUserInfo } from "../store";

interface IProtectedComponent {
  children: React.ReactNode;
  requiredPermissions?: string[];
  admin?: boolean
}

const ProtectedComponent: React.FC<IProtectedComponent> = ({
  children,
  requiredPermissions = [],
  admin = false,
}) => {
  const userInfo = useUserInfo()

  const isAuthorized = (admin && userInfo?.isSuperuser) ||
    (!admin && userInfo && requiredPermissions.every(permission => userInfo.permissions?.includes(permission)));

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedComponent;