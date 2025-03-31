import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SupabaseStatus } from '@/components/supabase-status'
import { ArrowLeft } from 'lucide-react'
import { AlternativeHomeButton } from '@/components/alternative-home-button'
import { HomeButton } from '@/components/home-button'
import { AuthResetButton } from '@/components/auth-reset-button'

export default function DiagnosePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">System Diagnostics</h1>
          <p className="text-muted-foreground mt-2">Check your application&apos;s connection status</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Supabase Connection</h2>
            <SupabaseStatus />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Auth Reset Tool</h2>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-4">
                If you&apos;re experiencing authentication issues after your Supabase project was paused and unpaused,
                the button below can help reset your auth state and fix migration issues.
              </p>
              <AuthResetButton />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Environment Information</h2>
            <div className="bg-background border rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs">
                <code>
                  {`Next.js Version: ${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ? '(production build)' : 'Development'}\n`}
                  {`Node Environment: ${process.env.NODE_ENV}\n`}
                  {`Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured'}`}
                </code>
              </pre>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Common Issues</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Make sure your Supabase project is active and not paused</li>
              <li>Check that your environment variables are correctly set</li>
              <li>Ensure the database schema includes required tables (profiles, etc.)</li>
              <li>After a project is unpaused, auth migrations may need to be repaired</li>
              <li>Browser auth cookies may be invalid after a long pause</li>
              <li>Check for CORS issues if accessing from a different domain</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button asChild variant="outline">
            <Link href="/" prefetch={false}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          {/* Using client component for interactive button */}
          <AlternativeHomeButton />
        </div>
        
        <div className="mt-4 flex justify-center">
          <HomeButton />
        </div>
      </div>
    </div>
  )
} 