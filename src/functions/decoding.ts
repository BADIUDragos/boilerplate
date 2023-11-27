import { jwtDecode } from "jwt-decode";

export function decodeTokenAndSetUserInfo(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    const { id, username, permissions, email, isStaff } = decoded;
    return { id, username, permissions, email, isStaff };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
