import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SupabaseStatus } from '@/components/supabase-status'
import { ArrowLeft } from 'lucide-react'

export default function DiagnosePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">System Diagnostics</h1>
          <p className="text-muted-foreground mt-2">Check your application's connection status</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Supabase Connection</h2>
            <SupabaseStatus />
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
              <li>Check for CORS issues if accessing from a different domain</li>
              <li>Verify that your IP is not blocked by Supabase security policies</li>
            </ul>
          </div>
        </div>

        <div className="pt-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 