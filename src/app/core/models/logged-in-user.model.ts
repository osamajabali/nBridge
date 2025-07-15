export class LoggedInUser {
    email: string;
    expiresOn: number;
    isAuthenticated: boolean;
    message: string | null;
    refreshTokenExpiration: number;
    roles: string[];
    token: string;
    username: string;
  }
