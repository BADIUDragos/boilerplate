import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";

interface IProtectedComponent {
  children: React.ReactNode;
  requiredPermissions: string[] | null;
  loginRequired: boolean;
}

const ProtectedComponent: React.FC<IProtectedComponent> = ({
  children,
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

  return isAuthorized ? <>{children}</> : <></>;
};

export default ProtectedComponent;