import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = request.cookies.get("user");
  const isLoggedIn = user ? true : false;

  if (["/", "/login"].includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url), 307);
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url), 307);
  }

  if (pathname === "/dashboard" && isLoggedIn) {
    return NextResponse.redirect(
      new URL("/dashboard/overview", request.url),
      307,
    );
  }

  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard"],
};
