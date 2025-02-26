export interface ErrorResponse {
  status: "error";
  errorMessage?: string;
  cause?: unknown;
}

export const isErrorResponse = (
  response: unknown
): response is ErrorResponse => {
  return (response as ErrorResponse).status === "error";
};
