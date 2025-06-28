export interface LoginResponse {
  user: {
    name:string
    _id: string;
    email: string;
  }
  accessToken: string
}
export type tokenResponse = string
export interface SignUpResponse {
  _id: string;
  name: string;
  email: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}


export interface InitialUserValue {
  auth: {
    user: SignUpResponse | LoginResponse | null;
    accessToken: string | null
  }
  loading: boolean;
  error: string;
}