import { UserRequest, UserResponse } from "@/app/types/api/auth";

/**
 * ユーザー情報取得API
 * @param request
 * @returns
 */
export const AuthUser = async (request: UserRequest): Promise<UserResponse> => {
  const url = new URL("/api/auth", process.env.NEXT_PUBLIC_API_BASE_URL).toString();
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // 認証済みであることを表すためには以下のように Authorization ヘッダにベアラートークンを設定する必要がある
      // https://note.com/pisuke2525/n/n00dc1a20efd3#b87fa57b-71aa-4b53-82a3-a99d41f351a7
      Authorization: `Bearer ${request.token}`,
    },
    method: "GET",
  });
  return response.json();
};
