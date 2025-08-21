import { RegisterRequest } from "@/app/types/api/auth";

export interface ErrorResponse {
  status: "error";
  errorMessage?: string;
  cause?: unknown;
}

export const isErrorResponse = (response: unknown): response is ErrorResponse => {
  return (response as ErrorResponse).status === "error";
};
export type RegisterErrors = Partial<Record<keyof RegisterRequest, string>>;
