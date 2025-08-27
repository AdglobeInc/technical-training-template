import { callApi } from "@/app/api/callApi";
import { SigninErrorResponse, SigninRequest, SigninResponse } from "@/app/types/api/auth";

/**
 * ログインAPI
 * @param request
 * @returns
 */
export const authSignin = async (request: SigninRequest) => {
  return callApi<SigninResponse, SigninErrorResponse>("/auth/signin/", {
    method: "POST",
    body: JSON.stringify(request),
  });
};
