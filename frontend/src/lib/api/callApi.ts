import { Result } from "@/types/api/base";
import { StatusCodes } from "http-status-codes";
import urlJoin from "url-join";

/**
 * アプリケーション全体で使用する汎用APIクライアント
 * @param path APIエンドポイントのパス (例: "/auth/user/id")
 * @param options fetchに渡すオプション
 * @returns APIの実行結果 (Result型)
 */
export const callApi = async <T, E>(
  path: string,
  options: RequestInit = {},
): Promise<Result<T, E>> => {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  try {
    const url = urlJoin(process.env.NEXT_PUBLIC_API_BASE_URL, path);

    const newOptions: RequestInit = {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, newOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("errorData", errorData);
      return {
        success: false,
        data: errorData as E,
        statusCode: response.status,
      };
    }

    if (response.status === StatusCodes.NO_CONTENT) {
      return {
        success: true,
        data: null as T,
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return { success: true, data, statusCode: response.status };
  } catch (e) {
    console.error("API call error:", e);
    throw e;
  }
};
