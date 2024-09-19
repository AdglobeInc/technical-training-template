import { FetchError } from "ofetch";

class ApiUtilPlugin {
  // APIのエンドポイントを取得
  baseUrl() {
    const { appBaseUrl } = useRuntimeConfig().public;
    return appBaseUrl;
  }

  // APIテスト用エンドポイント
  testUrl() {
    const { appTestUrl } = useRuntimeConfig().public;
    return appTestUrl;
  }

  // APIエラーハンドリング
  fetchError({ data, statusCode }: FetchError): ErrorResponse {
    if (!statusCode) {
      return {
        status: "error",
        errorMessage: "通信が失敗しました",
      };
    }
    if (statusCode >= 400 && statusCode < 500) {
      // APIから返却されたエラーメッセージを取り出す
      return {
        status: "error",
        errorMessage: "通信エラーが発生しました",
        cause: data.cause,
      };
    }

    return {
      status: "error",
      errorMessage: "例外が発生しました",
      cause: data.cause,
    };
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiUtil: new ApiUtilPlugin(),
    },
  };
});
