export interface RegisterRequest {
  name: string;
  password: string;
}

export interface LoginRequest {
  username: string;
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
}
