'use client'

import { Button } from "@/components/ui/button"

export function AlternativeHomeButton() {
  return (
    <Button 
      variant="secondary" 
      onClick={() => window.location.href = '/'}
      className="sm:ml-2"
    >
      Alternative Home Button
    </Button>
  )
} 