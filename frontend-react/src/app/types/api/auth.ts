export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface LogoutRequest {
  token: string;
}

export interface UserRequest {
  token: string;
}

export interface UserResponse {
  name: string;
  email: string;
}
