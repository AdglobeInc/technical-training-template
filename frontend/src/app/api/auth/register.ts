import { RegisterErrorResponse, RegisterRequest, RegisterResponse } from "@/app/types/api/auth";
import { Result } from "@/app/types/api/base";
import { callApi } from "../callApi";

/**
 * 新規登録API
 * @param request
 * @returns
 */
export const authRegister = async (request: RegisterRequest) => {
  return callApi<RegisterResponse, RegisterErrorResponse>("/auth/users", {
    method: "POST",
    body: JSON.stringify(request),
    credentials: "include",
  });
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
