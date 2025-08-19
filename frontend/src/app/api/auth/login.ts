import { LoginRequest, LoginResponse } from "@/app/types/api/auth";

/**
 * ログインAPI
 * @param request
 * @returns
 */
export const AuthLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  const url = new URL("/api/auth", process.env.NEXT_PUBLIC_API_BASE_URL).toString();
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.json();
};
