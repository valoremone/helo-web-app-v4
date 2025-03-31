import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { signInAction } from '@/app/actions'
import { FormMessage, type Message } from '@/components/form-message'

interface SignInPageProps {
  searchParams?: {
    error?: string
    message?: string
    success?: string
  }
}

export default function SignIn({ searchParams }: SignInPageProps) {
  // Convert searchParams to Message type for FormMessage component
  const message: Message | null = searchParams
    ? searchParams.error
      ? { error: searchParams.error }
      : searchParams.success
      ? { success: searchParams.success }
      : searchParams.message
      ? { message: searchParams.message }
      : null
    : null;

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-sm flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signInAction}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Sign in to your account to access your dashboard
        </p>
        
        {/* Display message about potential auth issues */}
        {searchParams?.error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive text-sm rounded-md">
            <p><strong>Error:</strong> {searchParams.error}</p>
            <p className="mt-2 text-xs">
              If you&apos;re seeing persistent login errors, our Supabase project may have been recently reactivated.
              Please visit the <Link href="/diagnose" className="underline">diagnostic page</Link> to reset your auth state.
            </p>
          </div>
        )}

        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        {message && <FormMessage message={message} />}

        <button className="bg-primary rounded-md px-4 py-2 text-primary-foreground mb-2">
          Sign In
        </button>
        <Link
          href="/sign-up"
          className="border border-input rounded-md px-4 py-2 text-sm text-center"
        >
          Don&apos;t have an account? Sign Up
        </Link>
        <Link
          href="/forgot-password"
          className="text-sm text-center underline"
        >
          Forgot password?
        </Link>
      </form>
    </div>
  )
} 