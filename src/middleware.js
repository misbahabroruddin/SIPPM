import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { ADMINISTRATOR, DOSEN, LPPM, REVIEWER } from "./lib/constants/role";
import { matchesDosenPath } from "./lib/datas/dosen-path";
import { ADMINISTRATOR_PATHS } from "./lib/datas/administrator-path";
import { matchesLppmPath } from "./lib/datas/lppm-path";
import { matchesReviewerPath } from "./lib/datas/reviewer-path";

const middleware = async (request) => {
  try {
    const path = request.nextUrl.pathname;
    const nextAuthToken =
      process.env.NODE_ENV === "production"
        ? request.cookies.get("__Secure-next-auth.session-token")
        : request.cookies.get("next-auth.session-token");

    const token = await getToken({
      req: request,
      secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    });

    const role = token?.roles[0].name;

    if (role !== DOSEN && matchesDosenPath(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role !== ADMINISTRATOR && ADMINISTRATOR_PATHS.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role !== LPPM && matchesLppmPath(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role !== REVIEWER && matchesReviewerPath(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!nextAuthToken && path !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (nextAuthToken && path === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If the token is present, continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/",
    "/login",
    "/proposal/penelitian/edit/[id]",
    "/proposal/penelitian/track/[id]",
  ],
};

export default middleware;
