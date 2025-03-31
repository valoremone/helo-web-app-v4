import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading content...</p>
      </div>
    </div>
  )
} 