/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    //"/account/new-verification"
    //"/account/verify-phone"
  ];
  
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /dashboard
   * @type {string[]}
   */
  export const authRoutes = [
    "/account/login",
    "/account/register",
    //"/account/error",
    //"/account/reset",
    "/account/forgot-password",
    "/account/verify-phone"
  ];
  
  /**
   * The prefix for API authentication routes
   * Routes that start with this prefix are used for API authentication purposes
   * @type {string}
   */
  export const apiAuthPrefix = "/api/auth";
  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT = "/dashboard";