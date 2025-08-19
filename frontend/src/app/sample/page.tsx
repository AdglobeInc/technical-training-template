"use client";

import React, { useCallback, useState } from "react";
import { AuthLogin } from "../api/auth/login";
import { AuthLogout } from "../api/auth/logout";
import { authRegister } from "../api/auth/register";
import { AuthUser } from "../api/auth/user";
import { isErrorResponse } from "../types/api/base";
import { Button } from "./_components/Button/Button";
import { Input } from "./_components/Input/Input";
import styles from "./page.module.css";

const Sample = () => {
  const [auth, setAuth] = useState({
    token: "",
    name: "",
    email: "",
  });

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleOnChangeRegister = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleOnChangeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleRegister = useCallback(async () => {
    try {
      // 登録リクエストの送信
      // 非同期で実行されるため await で待ち受ける
      const response = await authRegister(registerInfo);
      console.log(response);

      // エラー処理
      if (isErrorResponse(response)) {
        return alert(response.errorMessage);
      }

      setAuth((prev) => ({
        ...prev,
        token: response.token,
        name: response.name,
        email: response.email,
      }));
    } catch (e) {
      // HTTPステータスコードが異常値の場合は例外として検知できる
      console.error(e);
    }
  }, [registerInfo]);

  const handleLogin = useCallback(async () => {
    // ログインリクエストの送信
    // 非同期で実行されるため then で待ち受ける
    try {
      // 登録リクエストの送信
      // 非同期で実行されるため await で待ち受ける
      const loginResponse = await AuthLogin(loginInfo);
      console.log(loginResponse);

      // エラー処理
      if (isErrorResponse(loginResponse)) {
        return alert(loginResponse.errorMessage);
      }

      const userResponse = await AuthUser({
        token: loginResponse.token,
      });
      console.log(userResponse);

      // エラー処理
      if (isErrorResponse(userResponse)) {
        return alert(userResponse.errorMessage);
      }

      setAuth((prev) => ({
        ...prev,
        token: loginResponse.token,
        name: userResponse.name,
        email: userResponse.email,
      }));
    } catch (e) {
      // HTTPステータスコードが異常値の場合は例外として検知できる
      console.error(e);
    }
  }, [loginInfo]);

  const handleLogout = useCallback(async () => {
    // ログインリクエストの送信
    // 非同期で実行されるため then で待ち受ける
    try {
      // 登録リクエストの送信
      // 非同期で実行されるため await で待ち受ける
      const response = await AuthLogout(auth);
      console.log(response);

      setAuth((prev) => ({
        ...prev,
        token: "",
        name: "",
        email: "",
      }));
    } catch (e) {
      // HTTPステータスコードが異常値の場合は例外として検知できる
      console.error(e);
    }
  }, [auth]);

  return (
    <div className={styles.content}>
      <fieldset className={styles.fieldset}>
        <legend>登録するユーザ情報を入力</legend>
        <div className={styles.form}>
          <p>
            <label>
              名前:
              <Input
                name="name"
                value={registerInfo.name}
                onChange={handleOnChangeRegister}
                type="text"
              />
            </label>
          </p>
          <p>
            <label>
              メールアドレス:
              <Input
                name="email"
                value={registerInfo.email}
                onChange={handleOnChangeRegister}
                type="email"
              />
            </label>
          </p>
          <p>
            <label>
              パスワード:
              <Input
                name="password"
                value={registerInfo.password}
                onChange={handleOnChangeRegister}
                type="password"
              />
            </label>
          </p>
        </div>
        <Button type="button" className={styles.button} onClick={handleRegister}>
          登録
        </Button>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>ログインを行うユーザ情報を入力</legend>
        <div className={styles.form}>
          <p>
            <label>
              メールアドレス:
              <Input
                name="email"
                value={loginInfo.email}
                onChange={handleOnChangeLogin}
                type="email"
              />
            </label>
          </p>
          <p>
            <label>
              パスワード:
              <Input
                name="password"
                value={loginInfo.password}
                onChange={handleOnChangeLogin}
                type="password"
              />
            </label>
          </p>
        </div>
        <Button type="button" className={styles.button} onClick={handleLogin}>
          ログイン
        </Button>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>最後にログインを行った認証情報</legend>
        <div className={styles.form}>
          <p>
            アクセストークン:
            <span>{auth.token}</span>
          </p>
          <p>
            名前:
            <span>{auth.name}</span>
          </p>
          <p>
            メールアドレス:
            <span>{auth.email}</span>
          </p>
        </div>
        <Button type="button" className={styles.button} onClick={handleLogout}>
          ログアウト
        </Button>
      </fieldset>
    </div>
  );
};

export default Sample;
