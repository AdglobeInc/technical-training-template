import { LogoutRequest } from "@/app/types/api/auth";

/**
 * ログアウトAPI
 * @param request
 * @returns
 */
export const AuthLogout = async (request: LogoutRequest): Promise<void> => {
  const url = new URL(
    "/api/auth",
    process.env.NEXT_PUBLIC_API_BASE_URL
  ).toString();

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // 認証済みであることを表すためには以下のように Authorization ヘッダにベアラートークンを設定する必要がある
      // https://note.com/pisuke2525/n/n00dc1a20efd3#b87fa57b-71aa-4b53-82a3-a99d41f351a7
      Authorization: `Bearer ${request.token}`,
    },
    method: "DELETE",
  });
};
