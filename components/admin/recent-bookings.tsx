'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'

// Mock data - replace with real data from your API
const bookings = [
  {
    id: '1',
    customer: {
      name: 'John Smith',
      email: 'john@example.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=75&fit=crop',
    },
    route: 'LAX → SFO',
    date: new Date(2024, 2, 15),
    status: 'completed',
    amount: 2500,
  },
  {
    id: '2',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&q=75&fit=crop',
    },
    route: 'JFK → MIA',
    date: new Date(2024, 2, 16),
    status: 'confirmed',
    amount: 3200,
  },
  {
    id: '3',
    customer: {
      name: 'Michael Brown',
      email: 'michael@example.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&q=75&fit=crop',
    },
    route: 'SFO → LAS',
    date: new Date(2024, 2, 17),
    status: 'pending',
    amount: 1800,
  },
  {
    id: '4',
    customer: {
      name: 'Emily Davis',
      email: 'emily@example.com',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&q=75&fit=crop',
    },
    route: 'ORD → DFW',
    date: new Date(2024, 2, 18),
    status: 'confirmed',
    amount: 2100,
  },
  {
    id: '5',
    customer: {
      name: 'David Wilson',
      email: 'david@example.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&q=75&fit=crop',
    },
    route: 'SEA → PDX',
    date: new Date(2024, 2, 19),
    status: 'pending',
    amount: 1500,
  },
]

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  confirmed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function RecentBookings() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={booking.customer.image} alt={booking.customer.name} />
                  <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{booking.customer.name}</div>
                  <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{booking.route}</TableCell>
            <TableCell>{formatDistanceToNow(booking.date, { addSuffix: true })}</TableCell>
            <TableCell>
              <Badge variant="secondary" className={statusColors[booking.status as keyof typeof statusColors]}>
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">${booking.amount.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 