import { createClient } from '@/lib/supabase/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

// Mock bookings data - would be fetched from Supabase in production
const mockBookings = [
  {
    id: 'B-123',
    route: 'Miami Beach → Fisher Island',
    date: new Date(2024, 4, 25, 14, 30),
    status: 'confirmed',
    passengers: 3,
    amount: 1800,
  },
  {
    id: 'B-124',
    route: 'South Beach → Palm Beach',
    date: new Date(2024, 4, 28, 10, 0),
    status: 'pending',
    passengers: 2,
    amount: 2200,
  },
]

export default async function BookingsPage() {
  // Get the authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // In production, fetch real bookings from Supabase
  // const { data: bookings } = await supabase
  //   .from('bookings')
  //   .select('*')
  //   .eq('user_id', user?.id)
  //   .order('date', { ascending: false })

  const bookings = mockBookings

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Bookings</h2>
        <p className="text-muted-foreground">
          View and manage your flights
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Passengers</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.route}</TableCell>
                  <TableCell>
                    {format(booking.date, 'MMM dd, yyyy h:mm a')}
                  </TableCell>
                  <TableCell>{booking.passengers}</TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === 'confirmed'
                          ? 'default'
                          : booking.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 