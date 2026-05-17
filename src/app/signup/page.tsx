import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { EXTERNAL_SIGNUP_URL } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Create your account — 01LOT",
  description: "Open your 01LOT arena account.",
};

/**
 * /signup is a redirect stub. The real registration flow is hosted on
 * Zitadel; every Enter-the-arena CTA links there directly, but this route
 * stays alive so old bookmarks resolve.
 *
 * Swap for `permanentRedirect()` once the external URL is finalised.
 */
export default function SignupPage() {
  redirect(EXTERNAL_SIGNUP_URL);
}
