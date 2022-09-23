import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../auth-provider/auth-provider';

/* eslint-disable-next-line */
export interface RequireAuthProps {}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuthContext();
  let location = useLocation();

  if (!auth.authUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate to={`/login/redirect`} state={{ from: location }} replace />
    );
  }

  return children;
}

export default RequireAuth;
