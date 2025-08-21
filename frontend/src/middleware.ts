import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 認証が必要なページのパスを定義
const protectedPaths = ["/sample_profile"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/sample", request.url);
  console.log("--- Middleware Log ---");
  console.log("Accessing Pathname:", pathname);
  console.log("Token Exists:", !!token);
  console.log("Is Protected Path?:", protectedPaths.includes(pathname));

  if (!token) {
    if (protectedPaths.includes(pathname)) {
      console.log(`★★★ NEXT.JS MIDDLEWARE IS ALIVE! Path: ${request.nextUrl.pathname} ★★★`);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  try {
    const url = new URL("/api/auth/token/verify/", process.env.INTERNAL_API_BASE_URL).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
      },
    });

    if (response.ok) {
      if (pathname === "/sample") {
        return NextResponse.redirect(new URL("/sample_profile", request.url));
      }
      return NextResponse.next();
    }

    // トークンが無効な場合 (期限切れなど) はログインページへ
    const redirectResponse = NextResponse.redirect(loginUrl);
    // 無効なCookieを削除するようブラウザに指示
    redirectResponse.cookies.delete("access_token");
    redirectResponse.cookies.delete("refresh_token");
    return redirectResponse;
  } catch (error) {
    console.error("Middlewareでの検証エラー:", error);
    return NextResponse.redirect(loginUrl);
  }
}

// Middlewareを適用するパスを指定
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
