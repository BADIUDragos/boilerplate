export interface AuthState {
  tokens: TokensResultData | null
  userInfo: UserInfoState | null;
}

export interface UserInfoState {
  id: string
  username: string
  permissions: string[]
  email: string
  isStaff: boolean
}

export interface TokensResultData {
  access: string | null;
  refresh: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface BlacklistingRefresh {
  refresh: string
}
