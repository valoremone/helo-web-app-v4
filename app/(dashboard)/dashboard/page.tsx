import Link from 'next/link'
import { Plane, Calendar, Users, Headphones } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

const quickActions = [
  {
    title: 'Book a Flight',
    description: 'Schedule your next luxury helicopter journey',
    href: '/dashboard/book',
    icon: Plane,
  },
  {
    title: 'View Bookings',
    description: 'Check your upcoming and past flights',
    href: '/dashboard/bookings',
    icon: Calendar,
  },
  {
    title: 'Update Profile',
    description: 'Manage your account settings',
    href: '/dashboard/profile',
    icon: Users,
  },
  {
    title: 'Contact Support',
    description: 'Get help from our concierge team',
    href: '/dashboard/support',
    icon: Headphones,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome to HELO</h2>
        <p className="text-muted-foreground">
          Your luxury air mobility experience starts here
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Card key={action.href} className="hover:bg-muted/50">
              <Link href={action.href}>
                <CardHeader>
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="mt-4">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest bookings and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">
              No recent activity to display
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Membership Benefits</CardTitle>
            <CardDescription>
              Exclusive perks and privileges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">VIP Lounge Access</h4>
              <p className="text-sm text-muted-foreground">
                Enjoy our exclusive 1000 Museum Building lounge
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Priority Booking</h4>
              <p className="text-sm text-muted-foreground">
                Book flights with as little as 1-hour notice
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Luxury Ground Transport</h4>
              <p className="text-sm text-muted-foreground">
                Complimentary black car service in armored Cadillac Escalades
              </p>
            </div>
            <Button className="w-full" variant="outline">
              <Link href="/dashboard/membership">View All Benefits</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 