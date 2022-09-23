import { Context, createContext, useContext, useState } from 'react';
import { AuthUser, AuthContextType, AuthUserInfo} from '../auth.types';

const authString = localStorage.getItem('auth');
let auth: AuthUser | null = authString ? JSON.parse(authString) : null;

if (auth && new Date() > new Date(auth.expiryTime)) {
  localStorage.removeItem('auth');
  auth = null;
}

const AuthContext: Context<AuthContextType> = createContext<AuthContextType>(
  null!
);

/* eslint-disable-next-line */
export interface AuthProviderProps {
  children: JSX.Element;
  initialAuthState?: AuthUser;
}

export function AuthProvider({ initialAuthState, children }: AuthProviderProps) {
  // TODO: Setup auth correctly so that it will refresh after time period

  const [authUser, setAuthUser] = useState<any>(auth);
  const [authUserInfo, setAuthUserInfo] = useState<AuthUserInfo | null>(null!);

  if (initialAuthState) {
    setAuthUser(initialAuthState);
  }

  const signin = (authUser: AuthUser) => {
    localStorage.setItem('auth', JSON.stringify(authUser));
    setAuthUser(authUser);
  };

  const signout = () => {
    localStorage.removeItem('auth');
    setAuthUser(null);
  };

  const setUserInfo = (userInfo: AuthUserInfo) => {
    setAuthUserInfo(userInfo);
  };

  const value = {
    authUser,
    userInfo: authUserInfo,
    signin,
    signout,
    setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context.authUser === undefined) {
    throw new Error('Auth Context Used Outside of Provider');
  }

  return context;
}

export default AuthProvider;
