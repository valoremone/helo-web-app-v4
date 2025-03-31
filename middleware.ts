import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: "",
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.
    const { data: { user }, error } = await supabase.auth.getUser();

    // If we got an error trying to get the user, redirect to the diagnose page
    if (error) {
      console.error('Auth error in middleware:', error.message);
      // Handle specific auth errors here if needed
      if (request.nextUrl.pathname !== '/diagnose') {
        return NextResponse.redirect(new URL('/diagnose', request.url));
      }
      return response;
    }

    // If there's no user and trying to access protected routes
    if (!user && (
      request.nextUrl.pathname.startsWith('/protected') ||
      request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/admin')
    )) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // If there's a user and trying to access auth pages
    if (user && (
      request.nextUrl.pathname.startsWith('/sign-in') ||
      request.nextUrl.pathname.startsWith('/sign-up')
    )) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }

    // If trying to access admin routes, check if user is admin
    if (user && request.nextUrl.pathname.startsWith('/admin')) {
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError.message);
          // If we can't check the role, deny access as a precaution
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (profile?.role !== 'admin') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch (err) {
        console.error('Unexpected error checking user role:', err);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    return response;
  } catch (err) {
    console.error('Unexpected error in middleware:', err);
    
    // Only redirect to diagnose if not already there to prevent redirect loops
    if (request.nextUrl.pathname !== '/diagnose') {
      return NextResponse.redirect(new URL('/diagnose', request.url));
    }
    
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
