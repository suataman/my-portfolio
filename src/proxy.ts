import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals and files with an extension (images, PDFs…)
  matcher: "/((?!api|trpc|_next|_vercel|.*\..*).*)",
};
