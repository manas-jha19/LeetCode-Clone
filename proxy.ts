import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// The `/dashboard` patterns were removed after that slice was migrated.
// Keep the remaining patterns until their routes are migrated.
const isProtected = createRouteMatcher(["/settings(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});
