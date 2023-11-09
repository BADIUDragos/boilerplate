import { jwtDecode } from "jwt-decode";

export function decodeTokenAndSetDecodedInfo(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    const { id, username, permissions, isStaff } = decoded;
    return { id, username, permissions, isStaff };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
