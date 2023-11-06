export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: DecodedTokenState | null;
}

export interface DecodedTokenState {
  id: string | null;
  username: string | null;
  permissions: string[] | null;
}

export interface LoginResultData {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}
