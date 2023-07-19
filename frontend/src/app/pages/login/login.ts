export interface Login {
  email: string;
  password: string;
  stayConnected: boolean;
  token: string;
  _csrf: string;
}
