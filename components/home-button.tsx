'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Home } from "lucide-react"

export function HomeButton() {
  const router = useRouter()

  return (
    <Button 
      onClick={() => {
        // Force a hard navigation
        window.location.href = '/'
      }}
      variant="default"
      className="mt-4"
    >
      <Home className="mr-2 h-4 w-4" />
      Return Home
    </Button>
  )
} 