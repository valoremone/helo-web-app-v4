import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MessageSquare, Send } from 'lucide-react'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default async function SupportPage() {
  // Get the authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Concierge Support</h2>
        <p className="text-muted-foreground">
          Get assistance from our dedicated concierge team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat with Concierge
            </CardTitle>
            <CardDescription>
              Our team is available 24/7 to assist with your requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[400px]">
              <div className="flex-1 space-y-4 overflow-auto p-4 border rounded-md mb-4">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      Hello! How can I assist you today with your luxury helicopter travel needs?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      HELO Concierge • 1m ago
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full border rounded-full py-2 pl-4 pr-10"
                />
                <Button size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Requests</CardTitle>
            <CardDescription>
              Quick options for assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start">
              Modify my booking
            </Button>
            <Button variant="outline" className="justify-start">
              Request ground transportation
            </Button>
            <Button variant="outline" className="justify-start">
              Special accommodations
            </Button>
            <Button variant="outline" className="justify-start">
              Dining arrangements
            </Button>
            <Button variant="outline" className="justify-start">
              Report an issue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 