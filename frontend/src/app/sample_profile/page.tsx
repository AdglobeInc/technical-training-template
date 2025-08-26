"use client";
import { AuthLogout } from "@/app/api/auth/logout";
function Page() {
  const handleLogout = async () => {
    try {
      await AuthLogout();
    } catch (e) {
      console.error(e);
    } finally {
      window.location.href = "/sample";
    }
  };

  return (
    <>
      <div>page</div>
      <button onClick={handleLogout}>サインアウト</button>
    </>
  );
}

export default Page;
