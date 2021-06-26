import { User } from './user.model';

export class Authorization {
  accessToken: string;
  expiresIn: string;
  user: User;
}

export class AuthorizationResponse {
  success: boolean;
  data: Authorization;
}
