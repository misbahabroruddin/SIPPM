import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { DOSEN } from "./lib/constants/role";
import { DOSEN_PATHS } from "./lib/datas/dosen-path";

const middleware = async (request) => {
  try {
    const path = request.nextUrl.pathname;
    const nextAuthToken = request.cookies.get("next-auth.session-token");

    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    const role = token?.roles[0].name;

    if (role !== DOSEN && DOSEN_PATHS.includes(path)) {
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
