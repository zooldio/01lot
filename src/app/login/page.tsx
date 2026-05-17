import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EXTERNAL_LOGIN_URL } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Sign in — 01LOT",
  description: "Sign in to your 01LOT account.",
};

/**
 * /login is a redirect stub. The real sign-in flow lives on the production
 * platform (Zitadel-backed). Every Sign-in CTA on the marketing site links
 * directly to the external URL, but this route stays alive so old bookmarks
 * and the route in copy.ts continue to resolve.
 *
 * Next's `redirect()` from a server component performs an HTTP 307. To make
 * it a permanent move (and have it cached by browsers / SEO) swap for
 * `permanentRedirect()` once the platform URL is finalised.
 */
export default function LoginPage() {
  redirect(EXTERNAL_LOGIN_URL);
}
