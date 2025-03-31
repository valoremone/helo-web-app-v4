'use client'

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function HomeButton() {
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