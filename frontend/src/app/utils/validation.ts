import { RegisterRequest } from "@/app/types/api/auth";
import { RegisterErrors } from "@/app/types/api/base";
/**
 * 登録フォーム全体を検証し、エラーオブジェクトを返す関数
 * @param data {RegisterRequest} フォームの入力データ
 * @returns {RegisterErrors} エラーがあれば、フィールド名をキーにしたエラーメッセージのオブジェクト
 */
export const validateRegisterForm = (data: RegisterRequest): RegisterErrors => {
  const errors: RegisterErrors = {};

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
