import { useEffect } from 'react';
// import { useAuthContext } from '../auth-provider/auth-provider';
// import { environment } from '../environments/environment';
import { environment } from '../../../config';
import { getPkce } from '../utils/pkce.utils';

export interface LoginRedirectProps {}

export function LoginRedirect(props: LoginRedirectProps) {
  // const auth = useAuthContext();

  useEffect(() => {
    const {verifier, challenge} = getPkce();
      localStorage.setItem('verifier', verifier);

      window.location.assign(
        `${environment.authProviderHostName}/oauth/authorize?scope=openid WorkOrdersDemoApp&response_type=code&redirect_uri=${environment.redirectUri}&client_id=${environment.clientId}&code_challenge=${challenge}&code_challenge_method=S256`
      );
  }, []);

  return null;
} 

export default LoginRedirect;
