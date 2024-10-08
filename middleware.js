import { NextResponse } from "next/server";

// It's a convention to name the function middleware.
// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";

export const middleware = auth;
export const config = {
  matcher: ["/account"],
};
