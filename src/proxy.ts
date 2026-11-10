import { NextResponse, type NextRequest } from "next/server";
import { localeFromAcceptLanguage } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const locale = localeFromAcceptLanguage(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: "/",
};
