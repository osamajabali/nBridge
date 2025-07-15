export class AccessToken{
    sub: string;
    jti: string;
    email: string;
    uid: string;
    roles: string[];
    exp: number;
    iss: string;
    aud: string;
}