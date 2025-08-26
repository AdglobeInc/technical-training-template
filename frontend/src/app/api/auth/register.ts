import { RegisterErrorResponse, RegisterRequest, RegisterResponse } from "@/app/types/api/auth";
import { Result } from "@/app/types/api/base";
import { callApi } from "../callApi";

/**
 * 新規登録API
 * @param request
 * @returns
 */
export const authRegister = async (
  request: RegisterRequest,
): Promise<Result<RegisterResponse, RegisterErrorResponse>> => {
  return callApi("/auth/register", {
    method: "POST",
    body: JSON.stringify(request),
  });
};
