export interface AuthUser {
  token: string;
  expiryTime: string;
  idToken: string;
  refreshToken: string;
}

export interface AuthUserInfo {
  name: string;
  email: string;
  profilePicture: string;
}

export interface AuthContextType {
  authUser: AuthUser;
  userInfo: AuthUserInfo | null;
  signin: (authUser: AuthUser) => void;
  signout: () => void;
  setUserInfo: (userInfo: AuthUserInfo) => void;
}
