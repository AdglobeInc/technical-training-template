"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { authLogin } from "../api/auth/login";
import { authRegister } from "../api/auth/register";
import { authUser } from "../api/auth/user";
import { Button } from "./_components/Button/Button";
import { Input } from "./_components/Input/Input";
import styles from "./page.module.css";

const Sample = () => {
  const router = useRouter();

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    username: "",
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
    const result = await authRegister(registerInfo);
    console.log(result);

    if (!result.success) {
      return alert(result.data?.message);
    }
  }, [registerInfo]);

  const handleLogin = useCallback(async () => {
    const loginResult = await authLogin(loginInfo);
    console.log(loginResult);

    if (!loginResult.success) {
      return alert(loginResult.data?.message);
    }

    const userResult = await authUser();
    console.log(userResult);

    if (!userResult.success) {
      return alert(userResult.data?.message);
    }

    router.push("/home");
  }, [loginInfo, router]);

  return (
    <div className={styles.content}>
      <fieldset className={styles.fieldset}>
        <legend>登録するユーザ情報を入力</legend>
        <div className={styles.form}>
          <p>
            <label>
              名前:
              <Input
                name="username"
                value={registerInfo.username}
                onChange={handleOnChangeRegister}
                type="text"
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
              ユーザID:
              <Input
                name="username"
                value={loginInfo.username}
                onChange={handleOnChangeLogin}
                type="text"
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
    </div>
  );
};

export default Sample;
