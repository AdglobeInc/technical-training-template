import { LogoutErrorResponse, LogoutResponse } from "@/app/types/api/auth";
import { callApi } from "../callApi";

/**
 * ログアウトAPI
 * @param request
 * @returns
 */
export const authLogout = async () => {
  return callApi<LogoutResponse, LogoutErrorResponse>("/auth/logout/", {
    method: "DELETE",
  });
};
