import { SignoutErrorResponse, SignoutResponse } from "@/app/types/api/auth";
import { callApi } from "../callApi";

/**
 * ログアウトAPI
 * @param request
 * @returns
 */
export const authSignout = async () => {
  return callApi<SignoutResponse, SignoutErrorResponse>("/auth/signout/", {
    method: "DELETE",
  });
};
