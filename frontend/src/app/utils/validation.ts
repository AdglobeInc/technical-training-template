import { SignupRequest, SignupValidateErrors } from "@/app/types/api/auth";
/**
 * 登録フォーム全体を検証し、エラーオブジェクトを返す関数
 * @param data {SignupRequest} フォームの入力データ
 * @returns {SignupValidateErrors} エラーがあれば、フィールド名をキーにしたエラーメッセージのオブジェクト
 */
export const validateSignupForm = (data: SignupRequest): SignupValidateErrors => {
  const errors: SignupValidateErrors = {};

  // --- ユーザー名の検証 ---
  if (!data.username) {
    errors.username = "ユーザーIDは必須です。";
  } else if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
    errors.username = "ユーザーIDは英数字のみ使用できます。";
  } else if (data.username.length > 20) {
    errors.username = "ユーザーIDは20文字以内で入力してください。";
  }

  // --- パスワードの検証 ---
  if (!data.password) {
    errors.password = "パスワードは必須です。";
  } else if (!/^[a-zA-Z0-9]+$/.test(data.password)) {
    errors.password = "パスワードは英数字のみ使用できます。";
  } else if (data.password.length < 8 || data.password.length > 20) {
    errors.password = "パスワードは8文字以上20文字以内で入力してください!!";
  }

  return errors;
};
