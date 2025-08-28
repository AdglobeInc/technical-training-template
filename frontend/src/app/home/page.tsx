"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { authSignout } from "../api/auth/signout";
import { authUser } from "../api/auth/user";

function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");

  const handleUser = useCallback(async () => {
    const userResult = await authUser();
    console.log(userResult);

    if (!userResult.success) {
      return alert(userResult.data?.message);
    }

    setUser(userResult.data.username);
  }, []);

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  const handleSignout = useCallback(async () => {
    const result = await authSignout();
    if (!result.success) {
      return alert(result.data?.message);
    }
    router.push("/signin");
  }, [router]);

  return (
    <>
      <div>page</div>
      <div>ユーザー名: {user}</div>
      <button onClick={handleSignout}>サインアウト</button>
    </>
  );
}

export default Home;
