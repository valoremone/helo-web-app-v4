'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold text-primary">500</h1>
        <h2 className="text-3xl font-bold mt-4">Server Error</h2>
        <p className="mt-6 text-muted-foreground">
          {process.env.NODE_ENV === 'development' 
            ? `${error.message}` 
            : 'Something went wrong on our server. We\'re working to fix the issue.'}
        </p>
        <div className="mt-10 flex space-x-4 justify-center">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
        <div className="mt-4">
          <Button variant="link" asChild size="sm" className="text-sm">
            <Link href="/diagnose">Run Diagnostics</Link>
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-muted text-left rounded-md overflow-auto max-h-64">
            <pre className="text-xs">{error.stack}</pre>
          </div>
        )}
      </div>
    </div>
  )
} 