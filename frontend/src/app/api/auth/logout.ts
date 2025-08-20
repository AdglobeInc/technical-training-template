/**
 * ログアウトAPI
 * @param request
 * @returns
 */
export const AuthLogout = async () => {
  const url = new URL("/api/auth/logout/", process.env.NEXT_PUBLIC_API_BASE_URL).toString();

  fetch(url, {
    credentials: "include",
    method: "DELETE",
  });
};
