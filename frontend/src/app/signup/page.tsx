"use client";

import { Button } from "@/app/sample/_components/Button/Button";
import { Input } from "@/app/sample/_components/Input/Input";
import styles from "@/app/sample/page.module.css";
import { SignupValidateErrors } from "@/app/types/api/auth";
import { validateSignupForm } from "@/app/utils/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { authSignup } from "../api/auth/signup";

const Signup = () => {
  const router = useRouter();

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupValidateErrors>();

  const handleOnChangeSignup = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSignup = useCallback(async () => {
    console.log(signupInfo);

    const validationErrors = validateSignupForm(signupInfo);
    const hasErrors = Object.values(validationErrors).some((message) => message !== "");

    console.log(validationErrors);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }
    setErrors(undefined);

    const result = await authSignup(signupInfo);
    console.log(result);

    if (!result.success) {
      return alert("登録に失敗しました。入力内容をご確認ください。");
    }

    setSignupInfo({
      username: "",
      password: "",
    });
    router.push("/signin");
  }, [signupInfo, router]);

  return (
    <div className={styles.content}>
      <fieldset className={styles.fieldset}>
        <legend>サインアップするユーザ情報を入力</legend>
        <div className={styles.form}>
          <p>
            <label>
              ユーザー名:
              <Input
                name="username"
                value={signupInfo.username}
                onChange={handleOnChangeSignup}
                type="text"
              />
            </label>
            <br />
            <span>{errors?.username}</span>
          </p>
          <p>
            <label>
              パスワード:
              <Input
                name="password"
                value={signupInfo.password}
                onChange={handleOnChangeSignup}
                type="password"
              />
            </label>
            <br />
            <span>{errors?.password}</span>
          </p>
        </div>
        <Button type="button" className={styles.button} onClick={handleSignup}>
          サインアップ
        </Button>
        <p>
          <span>
            既にアカウントをお持ちの方は
            <Link href="/signin">こちらからサインイン</Link>
          </span>
        </p>
      </fieldset>
    </div>
  );
};

export default Signup;
