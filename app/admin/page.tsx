import Link from 'next/link'
import { Users, Calendar, Settings, Activity } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from '@/components/admin/overview'
import { RecentBookings } from '@/components/admin/recent-bookings'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

const stats = [
  {
    title: 'Total Bookings',
    value: '89',
    description: 'Last 30 days',
    icon: Calendar,
  },
  {
    title: 'Active Members',
    value: '42',
    description: 'Current members',
    icon: Users,
  },
  {
    title: 'Fleet Status',
    value: '4/5',
    description: 'Aircraft available',
    icon: Activity,
  },
  {
    title: 'System Status',
    value: 'Online',
    description: 'All systems operational',
    icon: Settings,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, Administrator
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentBookings />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 