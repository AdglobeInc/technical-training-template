export interface ApiTestPluginInterface {
  apiTest(request: TestRequest): Promise<TestResponse | ErrorResponse>;
  apiPostTest(
    request: TestPostRequest,
  ): Promise<TestPostResponse | ErrorResponse>;
}

class ApiTestPlugin implements ApiTestPluginInterface {
  async apiTest(request: TestRequest) {
    const { $apiUtil } = useNuxtApp();
    return $fetch<TestResponse>(
      `${$apiUtil.testUrl()}?latitude=${request.latitude}&longitude=${request.longitude}`,
      {
        method: "GET",
      },
    ).catch($apiUtil.fetchError);
  }

  async apiPostTest(request: TestPostRequest) {
    const { $apiUtil } = useNuxtApp();
    return $fetch<TestPostResponse>(`${$apiUtil.baseUrl()}/postTest`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch($apiUtil.fetchError);
  }
}

export default defineNuxtPlugin(() => {
  return {
    dependsOn: ["api"],
    provide: {
      apiTest: new ApiTestPlugin(),
    },
  };
});
