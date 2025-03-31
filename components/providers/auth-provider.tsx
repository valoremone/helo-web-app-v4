'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  error: Error | null
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  error: null,
  isAdmin: false,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error getting session:', sessionError.message)
          setError(sessionError)
        } else {
          setUser(session?.user ?? null)
        }
      } catch (err) {
        console.error('Unexpected error during auth initialization:', err)
        setError(err instanceof Error ? err : new Error('Unknown authentication error'))
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )

      return () => {
        subscription.unsubscribe()
      }
    } catch (err) {
      console.error('Error setting up auth listener:', err)
      setError(err instanceof Error ? err : new Error('Failed to set up authentication listener'))
      setLoading(false)
      return () => {}
    }
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  const value = {
    user,
    loading,
    signOut,
    error,
    isAdmin: user?.email === 'admin@flyhelo.one',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 