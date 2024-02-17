import { NextResponse } from "next/server";

const middleware = async (request) => {
  try {
    const path = request.nextUrl.pathname;
    const nextAuthToken = request.cookies.get("next-auth.session-token");

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
  ],
};

export default middleware;
