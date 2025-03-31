'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { GeistSans } from 'geist/font/sans'

export default function GlobalError({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <div className="max-w-md text-center">
          <h1 className="text-9xl font-bold text-primary">500</h1>
          <h2 className="text-3xl font-bold mt-4">Critical Error</h2>
          <p className="mt-6 text-muted-foreground">
            {process.env.NODE_ENV === 'development' 
              ? `${error.message}` 
              : 'A critical error occurred. We have been notified and are working to fix the issue.'}
          </p>
          <div className="mt-10">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
          <div className="mt-4">
            <Button variant="link" onClick={() => window.location.href = '/diagnose'} className="text-sm">
              Run Diagnostics
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-muted text-left rounded-md overflow-auto max-h-64">
              <pre className="text-xs">{error.stack}</pre>
            </div>
          )}
        </div>
      </body>
    </html>
  )
} 