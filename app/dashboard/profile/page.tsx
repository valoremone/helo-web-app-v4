import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  // Get the authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // In production, fetch user profile from Supabase
  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .eq('id', user?.id)
  //   .single()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="passengers">Saved Passengers</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      {user?.email || 'Not available'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">
                      {user?.phone || 'Not available'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No payment methods saved yet.</p>
            </CardContent>
            <CardFooter>
              <Button>Add Payment Method</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="passengers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Passengers</CardTitle>
              <CardDescription>
                Manage your saved passenger profiles for quicker booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No passengers saved yet.</p>
            </CardContent>
            <CardFooter>
              <Button>Add Passenger</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your notification and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Preferences will be implemented here.</p>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 