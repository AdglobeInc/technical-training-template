import { callApi } from "@/app/api/callApi";
import { UserErrorResponse, UserResponse } from "@/app/types/api/auth";

/**
 * ユーザー情報取得API
 * @returns
 */
export const authUser = async () => {
  return callApi<UserResponse, UserErrorResponse>("/auth/user", {
    method: "GET",
  });
};
