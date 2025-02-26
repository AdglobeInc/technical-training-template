import {
  LoginResponse,
  RegisterRequest,
  UserResponse,
} from "@/app/types/api/auth";
import { ErrorResponse } from "@/app/types/api/base";

/**
 * 新規登録API
 * @param request
 * @returns
 */
export const authRegister = async (
  request: RegisterRequest
): Promise<ErrorResponse | (LoginResponse & UserResponse)> => {
  const url = new URL("/api/users", process.env.NEXT_PUBLIC_API_BASE_URL).toString();
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.json();
};
