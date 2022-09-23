import { environment } from '../../../config';
import { AuthUser } from '../auth.types';

export interface UserInfoResponse {
  iss: string;
  sub: string;
  identity_type: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  locale: string;
  preferred_mfa_setting: any;
  picture: string;
}

export const getToken = (): string => {
  const authString = localStorage.getItem('auth');
  const auth: AuthUser = authString ? JSON.parse(authString) : null;

  if (auth === null) {
    throw new Error('User is unauthorised');
  } else {
    return auth.token;
  }
};

export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  const getUserInfoUrl = `${environment.authProviderHostName}/oauth/userinfo`;

  const response = await fetch(getUserInfoUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const userInfoResponse: UserInfoResponse = await response.json();

  return userInfoResponse;
};
