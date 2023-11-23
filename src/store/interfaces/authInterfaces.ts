export interface AuthState {
  tokens: LoginResultData | null
  userInfo: UserInfoState | null;
}

export interface UserInfoState {
  id: string | null;
  username: string | null;
  permissions: string[] | null;
  isStaff: boolean | null;
}

export interface LoginResultData {
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
