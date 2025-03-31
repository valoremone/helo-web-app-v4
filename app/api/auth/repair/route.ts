import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(_request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Use a direct SQL query to fix the common auth migration issue
    // This requires database admin privileges which the anon key shouldn't have
    // But we attempt it in case PostgreSQL policies allow it
    
    // Attempt to check if the migration exists
    const { data, error } = await supabase.from('auth.schema_migrations')
      .select('*')
      .eq('version', '20221208132122')
      .maybeSingle()
    
    if (error) {
      console.error('Error checking migration:', error.message)
      
      // Return helpful information for manual fixing
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        message: 'Cannot repair automatically. Please run this SQL in Supabase dashboard: INSERT INTO auth.schema_migrations VALUES (\'20221208132122\');',
        code: 'UNAUTHORIZED'
      }, { status: 401 })
    }
    
    // If migration already exists, no need to add it
    if (data) {
      return NextResponse.json({ 
        success: true,
        message: 'Auth migrations already fixed',
        revalidated: true
      })
    }
    
    // Attempt to insert the migration record
    const { error: insertError } = await supabase.rpc('insert_auth_migration', {
      migration_version: '20221208132122'
    })
    
    if (insertError) {
      console.error('Error inserting migration:', insertError.message)
      return NextResponse.json({ 
        success: false, 
        error: insertError.message,
        message: 'Cannot repair automatically. Please run this SQL in Supabase dashboard: INSERT INTO auth.schema_migrations VALUES (\'20221208132122\');',
        code: 'UNAUTHORIZED'
      }, { status: 401 })
    }
    
    // Sign out current session to clear any invalid session data
    await supabase.auth.signOut()
    
    return NextResponse.json({ 
      success: true,
      message: 'Auth migrations fixed and session cleared',
      revalidated: true
    })
  } catch (error: unknown) {
    console.error('Unexpected error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      success: false, 
      message: 'Unexpected error during repair',
      error: errorMessage
    }, { status: 500 })
  }
} 