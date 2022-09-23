import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../auth-provider/auth-provider';
import { AuthUser } from '../auth.types';
import { environment } from '../../../config';
import { getPkce } from '../utils/pkce.utils';

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

export interface LoginCallbackProps {}

export function LoginCallback(props: LoginCallbackProps) {
  const auth = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    const url = `${environment.authProviderHostName}/oauth/token`;
    const verifier1 = localStorage.getItem('verifier');
    const code = location.search.split('?')[1].split('&')[0].split('=')[1];

    //Generate a new challenge and verifier. this is needed for refreshing.
    const {verifier, challenge} = getPkce();

    const fetchResponse = async () => {
      const response = await fetch(url, {
        method: 'post',
        body: `grant_type=authorization_code&client_id=${
          environment.clientId
        }&redirect_uri=${encodeURIComponent(
          environment.redirectUri
        )}&code_challenge=${challenge}&code_challenge_method=S256&code=${code}&code_verifier=${verifier1}&tenantDomain=${encodeURIComponent(
          'Trimble.com'
        )}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json, text/plain, */*',
        },
      });

      const authResponse: AuthResponse = await response.json();

      const expiryTime = new Date();
      const tokenTime = expiryTime.getSeconds() + authResponse.expires_in
      expiryTime.setSeconds(tokenTime);

      const authUser: AuthUser = {
        token: authResponse.access_token,
        expiryTime: expiryTime.toISOString(),
        idToken: authResponse.id_token,
        refreshToken: authResponse.refresh_token,
      };

      auth.signin(authUser);
      localStorage.setItem('verifier', verifier);
    };

    fetchResponse().then();
  }, []);

  return !!auth.authUser ? <Navigate to={"/"} /> : null;
}

export default LoginCallback;
