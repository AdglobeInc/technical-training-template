import { SignupErrorResponse, SignupRequest, SignupResponse } from "@/app/types/api/auth";
import { callApi } from "../callApi";

/**
 * 新規登録API
 * @param request
 * @returns
 */
export const authSignup = async (request: SignupRequest) => {
  return callApi<SignupResponse, SignupErrorResponse>("/auth/signup/", {
    method: "POST",
    body: JSON.stringify(request),
    credentials: "include",
  });
};
