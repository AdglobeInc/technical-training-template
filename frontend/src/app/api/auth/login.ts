import { callApi } from "@/app/api/callApi";
import { LoginErrorResponse, LoginRequest, LoginResponse } from "@/app/types/api/auth";

/**
 * ログインAPI
 * @param request
 * @returns
 */
export const authLogin = async (request: LoginRequest) => {
  return callApi<LoginResponse, LoginErrorResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(request),
  });
};
