import { NextRequest, NextResponse } from "next/server";
import AppConstants from "./constants/AppConstants";

export function middleware(request: NextRequest) {
    const tokenFromCookie = request.cookies.get(AppConstants.ACCESS_TOKEN)?.value

    const authHeader = request.headers.get("Authorization")
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null
    const token = tokenFromCookie || tokenFromHeader;

    const publicRoutes = ["/sign-in", "/sign-up", "/verify-sign-up-token", "/verify-token"]

    const { pathname } = request.nextUrl
    const isPublicRoutes = publicRoutes.some((path) => pathname.startsWith(path))

    if(!token && !isPublicRoutes) {
        const url  = request.nextUrl.clone()
        url.pathname = "/sign-in"
        return NextResponse.redirect(url)
    }

    if(token && isPublicRoutes) {
        const url = request.nextUrl.clone()
        url.pathname = "/dashboard"
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}