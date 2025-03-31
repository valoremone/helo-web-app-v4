'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function AuthResetButton() {
  const [isResetting, setIsResetting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleReset = async () => {
    setIsResetting(true)
    setResult(null)

    try {
      // 1. Clear local cookies
      const authCookies = ['sb-access-token', 'sb-refresh-token', 'sb-auth-token', 'supabase-auth-token']
      authCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      })

      // 2. Sign out from Supabase
      const supabase = createClient()
      await supabase.auth.signOut()

      // 3. Try to repair auth migrations through API
      const repairResponse = await fetch('/api/auth/repair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const repairResult = await repairResponse.json()
      
      if (repairResponse.ok) {
        setResult({ 
          success: true, 
          message: 'Auth state reset successfully! Please refresh the page and try signing in again.'
        })
      } else {
        setResult({ 
          success: false, 
          message: repairResult.message || 'Could not automatically fix auth issues. You may need to contact support.'
        })
      }
    } catch (error) {
      console.error('Error resetting auth:', error)
      setResult({ 
        success: false, 
        message: 'An unexpected error occurred. Please try refreshing the page or contact support.'
      })
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleReset}
        disabled={isResetting}
        variant="secondary"
        className="w-full"
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        {isResetting ? 'Resetting Auth...' : 'Reset Auth State'}
      </Button>

      {result && (
        <Alert variant={result.success ? "default" : "destructive"}>
          {!result.success && <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{result.success ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>
            {result.message}
            
            {result.success && (
              <Button 
                className="mt-2" 
                size="sm" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
} 