import { NextResponse } from "next/server";

function sanitizeNext(next) {
  if (!next || typeof next !== "string") return "/";
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("://")) {
    return "/";
  }
  return next;
}

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  const sessionCookie = request.cookies.get("ae_session")?.value;

  if (pathname === "/signin") {
    if (sessionCookie) {
      const nextParam = sanitizeNext(searchParams.get("next"));
      return NextResponse.redirect(new URL(nextParam, request.url));
    }
    return NextResponse.next();
  }

  const isProtected =
    pathname.startsWith("/orders") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/kitchen");

  if (isProtected && !sessionCookie) {
    const nextParam = sanitizeNext(pathname);
    const redirectUrl = new URL(`/signin?next=${encodeURIComponent(nextParam)}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*", "/kitchen/:path*", "/signin"],
};
