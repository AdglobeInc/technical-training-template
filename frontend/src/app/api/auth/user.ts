import { UserResponse } from "@/app/types/api/auth";

/**
 * ユーザー情報取得API
 * @returns
 */
export const AuthUser = async (): Promise<UserResponse> => {
  const url = new URL("/api/auth/user/", process.env.NEXT_PUBLIC_API_BASE_URL).toString();
  const response = await fetch(url, {
    credentials: "include",
    method: "GET",
  });

  return response.json();
};
