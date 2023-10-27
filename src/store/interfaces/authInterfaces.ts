export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  decodedAccessTokenInfo: any | null;
}

export interface DecodedTokenState {
  id: string | null;
  username: string | null;
  permissions: string[] | null;
}
