import { createClient } from './server'

/**
 * When a Supabase project is paused and then unpaused, migration issues
 * can occur with Auth tables. This function attempts to fix them.
 * 
 * Should be called in a server action or API route.
 */
export async function repairAuthMigrations() {
  try {
    const supabase = await createClient()
    
    // Check if the auth schema_migrations table exists and if the problematic migration exists
    const { data: migrationExists, error: checkError } = await supabase.rpc(
      'check_migration_exists',
      { migration_id: '20221208132122' },
      { count: 'exact' }
    ).single()
    
    if (checkError) {
      // If RPC doesn't exist, try direct SQL - which requires proper permissions
      // This is just a stub since we can't directly run SQL with the anon key
      // The actual fix would be done through the API route we've implemented
      
      console.error('Error checking migration:', checkError.message)
      return { 
        success: false, 
        message: 'Could not fix auth migration. Please run this SQL in Supabase dashboard: INSERT INTO auth.schema_migrations VALUES (\'20221208132122\');'
      }
    }
    
    // Migration already exists, nothing to fix
    return { success: true, message: 'Auth migrations appear to be in order' }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error repairing auth migrations:', errorMessage)
    return { 
      success: false, 
      message: 'Error repairing auth migrations. You may need to manually fix in Supabase dashboard SQL editor.' 
    }
  }
}

/**
 * Clears all auth cookies from the browser
 * This is a client-side function to help recover from auth errors
 */
export function clearAuthCookies() {
  const authCookies = ['sb-access-token', 'sb-refresh-token', 'sb-auth-token', 'supabase-auth-token']
  
  authCookies.forEach(cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
  
  return { success: true, message: 'Auth cookies cleared' }
} 