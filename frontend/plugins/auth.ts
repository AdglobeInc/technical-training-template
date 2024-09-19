import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
} from "~/types/api/auth";

export interface AuthPluginInterface {
  register(request: RegisterRequest): Promise<LoginResponse | ErrorResponse>;
  login(request: LoginRequest): Promise<LoginResponse | ErrorResponse>;
  user(token: string): Promise<UserResponse | ErrorResponse>;
  logout(token: string): Promise<void>;
}

class AuthPlugin implements AuthPluginInterface {
  async register(
    request: RegisterRequest,
  ): Promise<ErrorResponse | (LoginResponse & UserResponse)> {
    const { $apiUtil } = useNuxtApp();
    return $fetch<(LoginResponse & UserResponse)>(`${$apiUtil.baseUrl()}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: request,
    }).catch($apiUtil.fetchError);
  }

  async login(request: LoginRequest): Promise<ErrorResponse | LoginResponse> {
    const { $apiUtil } = useNuxtApp();
    return $fetch<LoginResponse>(`${$apiUtil.baseUrl()}/auth`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: request,
    }).catch($apiUtil.fetchError);
  }

  async user(token: string): Promise<ErrorResponse | UserResponse> {
    const { $apiUtil } = useNuxtApp();
    return $fetch<UserResponse>(`${$apiUtil.baseUrl()}/auth`, {
      headers: {
        // 認証済みであることを表すためには以下のように Authorization ヘッダにベアラートークンを設定する必要がある
        // https://note.com/pisuke2525/n/n00dc1a20efd3#b87fa57b-71aa-4b53-82a3-a99d41f351a7
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).catch($apiUtil.fetchError);
  }

  async logout(token: string): Promise<void> {
    const { $apiUtil } = useNuxtApp();
    $fetch(`${$apiUtil.baseUrl()}/auth`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }).catch($apiUtil.fetchError);
  }
}

export default defineNuxtPlugin(() => {
  return {
    dependsOn: ["api"],
    provide: {
      auth: new AuthPlugin(),
    },
  };
});
