'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function SupabaseStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkConnection = async () => {
    setIsChecking(true)
    setStatus('loading')
    setErrorMessage(null)
    
    try {
      const supabase = createClient()
      
      // Try to make a simple query to check connection
      const { error } = await supabase.from('profiles').select('count', { count: 'exact' }).limit(1)

      if (error) {
        console.error('Supabase connection error:', error)
        setStatus('error')
        setErrorMessage(error.message)
      } else {
        setStatus('connected')
      }
    } catch (err) {
      console.error('Unexpected error checking Supabase:', err)
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <div className="max-w-md w-full">
      {status === 'error' ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Supabase Connection Error</AlertTitle>
          <AlertDescription>
            {errorMessage || 'Could not connect to Supabase'}
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkConnection}
                disabled={isChecking}
              >
                {isChecking ? 'Checking...' : 'Try Again'}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : status === 'connected' ? (
        <Alert>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>Connected to Supabase</AlertTitle>
          <AlertDescription>
            Your application is successfully connected to Supabase.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-4 w-4"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </Alert>
      )}
    </div>
  )
} 