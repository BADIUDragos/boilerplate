export interface AuthState {
  tokens: LoginResultData | null
  userInfo: UserInfoState | null;
}

export interface UserInfoState {
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
