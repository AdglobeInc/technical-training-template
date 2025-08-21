import { LoginResponse, RegisterRequest, UserResponse } from "@/app/types/api/auth";
import { ErrorResponse } from "@/app/types/api/base";

/**
 * 新規登録API
 * @param request
 * @returns
 */
export const authRegister = async (
  request: RegisterRequest,
): Promise<ErrorResponse | (LoginResponse & UserResponse)> => {
  const url = new URL("/api/auth/users/", process.env.NEXT_PUBLIC_API_BASE_URL).toString();
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(request),
    credentials: "include",
  });
  return response.json();
};

export const validateField = (name: keyof RegisterRequest, value: string): string => {
  switch (name) {
    case "username":
      if (!value) return "ユーザーIDは必須です。";
      if (!/^[a-zA-Z0-9]+$/.test(value)) return "ユーザーIDは英数字のみ使用できます。";
      if (value.length > 20) return "ユーザーIDは20文字以内で入力してください。";
      return "";

    case "password":
      if (!value) return "パスワードは必須です。";
      if (!/^[a-zA-Z0-9]+$/.test(value)) return "パスワードは英数字のみ使用できます。";
      if (value.length < 8) return "パスワードは8文字以上で入力してください。";
      if (value.length > 20) return "パスワードは20文字以内で入力してください。";
      return "";

    default:
      return "";
  }
};
