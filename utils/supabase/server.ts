import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { Database } from "@/types/supabase";

export async function createClient() {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: Omit<ResponseCookie, "name" | "value">) {
            try {
              cookieStore.set({
                name,
                value,
                ...options,
                // Ensure secure settings for production
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                httpOnly: true
              })
            } catch (error) {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
              console.error('Cookie set error (can be ignored if using middleware):', error)
            }
          },
          remove(name: string, options: Omit<ResponseCookie, "name" | "value">) {
            try {
              cookieStore.set({
                name,
                value: '',
                ...options,
                maxAge: 0,
                // Ensure secure settings for production
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                httpOnly: true
              })
            } catch (error) {
              // The `remove` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
              console.error('Cookie remove error (can be ignored if using middleware):', error)
            }
          },
        },
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      }
    )

    return supabase
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    // Return a basic client that will show the error in the UI
    // but won't throw and break the page
    const cookieStore = await cookies()
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
          set(name: string, value: string, options: Omit<ResponseCookie, "name" | "value">) {},
          remove(name: string, options: Omit<ResponseCookie, "name" | "value">) {},
        }
      }
    )
  }
}
