'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [profiles, setProfiles] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('profiles').select()
      setProfiles(data)
    }
    getData()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen" >
      <h1 className="text-2xl font-bold">Users</h1>
      <pre className="text-sm">{JSON.stringify(profiles, null, 2)}</pre>
    </div>
  )
}