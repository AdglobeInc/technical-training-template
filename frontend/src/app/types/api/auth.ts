export type RegisterRequest = {
  username: string;
  password: string;
};
export type RegisterResponse = UserResponse;
export type RegisterErrorResponse = {
  message: string;
};
// export type RegisterErrors = Partial<Record<keyof RegisterRequest, string>>;

export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = UserResponse;
export type LoginErrorResponse = {
  message: string;
};

export type LogoutResponse = null;
export type LogoutErrorResponse = {
  message: string;
};

export type UserResponse = {
  id: string;
};
export type UserErrorResponse = {
  message: string;
};
