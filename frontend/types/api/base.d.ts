interface ErrorResponse {
  status: "error";
  errorMessage?: string;
  cause?: unknown;
}
