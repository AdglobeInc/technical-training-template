"use client";
import { AuthLogout } from "@/app/api/auth/logout";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AuthLogout();
    } catch (e) {
      console.error(e);
    } finally {
      router.push("/sample");
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
