export interface LoginResponse {
  _id: string;
  email: string;
  accessToken:string,
}

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
  user: SignUpResponse | LoginResponse | null;
  loading: boolean;
  error: string;
}