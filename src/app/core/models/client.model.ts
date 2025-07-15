export class ClientRequest {
  id: string
  name: string;
  description: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export class ClientResponse {
  createdAt: string;
  description: string;
  externalConnection: any[];
  id: string;
  name: string;
  userId: string;
  username: string;
}

export class RefreshToken {
    token: string;
    createdOn: string;
    expiresOn: string;
    isActive: boolean;
    isExpired: boolean;
    revokedOn: string | null;
    securityStamp: string;
}