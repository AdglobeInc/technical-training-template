<template>
  <div class="content">
    <fieldset>
      <legend>登録するユーザ情報を入力</legend>
      <div>
        <p>
          <label>
            名前:
            <input v-model="registerInfo.name" type="text" />
          </label>
        </p>
        <p>
          <label>
            メールアドレス:
            <input v-model="registerInfo.email" type="email" />
          </label>
        </p>
        <p>
          <label>
            パスワード:
            <input v-model="registerInfo.password" type="password" />
          </label>
        </p>
      </div>
      <button type="button" @click="register">登録</button>
    </fieldset>
    <fieldset>
      <legend>ログインを行うユーザ情報を入力</legend>
      <div>
        <p>
          <label>
            メールアドレス:
            <input v-model="loginInfo.email" type="email" />
          </label>
        </p>
        <p>
          <label>
            パスワード:
            <input v-model="loginInfo.password" type="password" />
          </label>
        </p>
      </div>
      <button type="button" @click="login">ログイン</button>
    </fieldset>
    <fieldset>
      <legend>最後にログインを行った認証情報</legend>
      <div>
        <p>
          アクセストークン:
          <span>{{ authInfo.token }}</span>
        </p>
        <p>
          名前:
          <span>{{ authInfo.name }}</span>
        </p>
        <p>
          メールアドレス:
          <span>{{ authInfo.email }}</span>
        </p>
      </div>
      <button type="button" @click="logout">ログアウト</button>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
} from "~/types/api/auth";

const { $auth } = useNuxtApp();
const registerInfo = ref<RegisterRequest>({
  name: "",
  email: "",
  password: "",
});
const loginInfo = ref<LoginRequest>({
  email: "",
  password: "",
});
const authInfo = ref<LoginResponse & UserResponse>({
  token: "",
  name: "",
  email: "",
});

type PropertyInfo = { name: string; type: string };
const loginResponseProperties: PropertyInfo[] = [
  { name: "token", type: "string" },
];
const userResponseProperties: PropertyInfo[] = [
  { name: "name", type: "string" },
  { name: "email", type: "string" },
];

/**
 * @function ユーザ情報登録
 */
async function register() {
  try {
    // 登録リクエストの送信
    // 非同期で実行されるため await で待ち受ける
    const response = await $auth.register(registerInfo.value);
    console.log(response);

    // レスポンスの型チェック
    // 登録が正常に行われた場合は LoginResponse & UserResponse が、そうでない場合は ErrorResponse が返る
    if (is<(LoginResponse & UserResponse)>(response, loginResponseProperties)) {
      authInfo.value.token = response.token;
      authInfo.value.name = response.name;
      authInfo.value.email = response.email;
      // ユーザ登録と同時にログイン処理が実行される（詳細はバックエンドの実装を参照）
    } else {
      // 登録失敗時の処理を実装する
    }
  } catch (e) {
    // HTTPステータスコードが異常値の場合は例外として検知できる
    console.log(e);
  }
}

/**
 * @function ログイン
 */
async function login() {
  try {
    // メールアドレス/パスワードを用いてログインを試みる
    const response = await $auth.login(loginInfo.value);
    console.log(response);

    // レスポンスの型チェック
    // ログインが正常に行われた場合は LoginResponse が、そうでない場合は ErrorResponse が返る
    if (is<LoginResponse>(response, loginResponseProperties)) {
      authInfo.value.token = response.token;
      // レスポンスのトークンを使用してログイン中のユーザ情報を取得する
      await getUserInfo();
    } else {
      // ログイン失敗時の処理を実装する
    }
  } catch (e) {
    // HTTPステータスコードが異常値の場合は例外として検知できる
    console.log(e);
  }
}

/**
 * @function ログイン情報取得
 */
async function getUserInfo() {
  try {
    // ログインレスポンスのトークンを用いてログイン情報を取得する
    // トークンは諸説あるが画面の変数ではなく state や storage に持った方がよい
    // その際、トークンは引数で受け付けるよりは $auth.user 側で参照するように実装を修正すべき
    // https://qiita.com/NewGyu/items/0b3111b61405366a76c5
    const response = await $auth.user(authInfo.value.token);
    console.log(response);

    // レスポンスの型チェック
    // 登録が正常に行われた場合は UserResponse が、そうでない場合は ErrorResponse が返る
    if (is<UserResponse>(response, userResponseProperties)) {
      authInfo.value.name = response.name;
      authInfo.value.email = response.email;
    } else {
      // ログイン情報取得失敗時の処理を実装する
    }
  } catch (e) {
    // HTTPステータスコードが異常値の場合は例外として検知できる
    console.log(e);
  }
}

/**
 * @function ログイン情報取得
 */
async function logout() {
  try {
    // ログインレスポンスのトークンを用いてログアウトする
    // こちらもトークンは引数で受け付けるよりは $auth.logout 側で参照するように実装を修正すべき
    const response = await $auth.logout(authInfo.value.token);
    console.log(response);
    authInfo.value.token = "";
    authInfo.value.name = "";
    authInfo.value.email = "";
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function 型ガード関数
 * @summary T に指定された型が properties に定義されているプロパティの型と名前が一致しているかを判定する。<br>すべてが一致している場合 response は T 型のオブジェクトとして扱うことができる。
 */
function is<T extends object>(
  response: ErrorResponse | T,
  properties: PropertyInfo[],
): response is T {
  return properties.every(
    (x) =>
      // プロパティ名の判定
      Reflect.has(response, x.name) &&
      // 型の判定
      typeof Reflect.get(response, x.name) === x.type,
  );
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
