import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: (req) => req.url.includes("/"),
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

///////////////////////:update



// import { clerkMiddleware } from "@clerk/nextjs/server";
 
// export default clerkMiddleware();
 
// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

//// thirs pudate

