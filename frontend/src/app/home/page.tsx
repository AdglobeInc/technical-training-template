"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { authLogout } from "../api/auth/logout";
import { authUser } from "../api/auth/user";

function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");

  const handleUser = useCallback(async () => {
    const userResult = await authUser();
    if (!userResult.success) {
      return alert(userResult.data?.message);
    }
    setUser(userResult.data.id);
  }, []);

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  const handleLogout = useCallback(async () => {
    const result = await authLogout();
    if (!result.success) {
      return alert(result.data?.message);
    }
    router.push("/sample");
  }, [router]);

  return (
    <>
      <div>page</div>
      <div>ユーザーID: {user}</div>
      <button onClick={handleLogout}>サインアウト</button>
    </>
  );
}

export default Home;
