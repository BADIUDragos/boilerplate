import { jwtDecode } from "jwt-decode";

export function decodeTokenAndSetDecodedInfo(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    const { id, username, permissions } = decoded;
    return { id, username, permissions };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
