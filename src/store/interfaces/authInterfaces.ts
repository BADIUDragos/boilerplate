export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  decodedAccessTokenInfo: DecodedTokenState | null;
}

export interface DecodedTokenState {
  id: string | null;
  username: string | null;
  permissions: string[] | null;
}

export interface RefreshResultData {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}
