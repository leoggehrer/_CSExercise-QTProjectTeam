export interface AuthenticatedUser {
  sessionToken: string;
  jsonWebToken: string;
  name: string;
  email: string;
}
