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
import { Separator } from '@/components/ui/separator'
import { 
  Plane, 
  Users, 
  CalendarIcon, 
  MapPin, 
  Clock, 
  Download, 
  Mail, 
  Printer, 
  ArrowLeft, 
  Wallet, 
  CheckCircle2, 
  Share2 
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default async function BookingConfirmationPage() {
  // Get the authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Mock booking confirmation data
  const bookingData = {
    bookingId: 'HEL-12345',
    status: 'Confirmed',
    flightDetails: {
      from: 'Miami Beach',
      to: 'Palm Beach',
      date: 'May 15, 2024',
      time: '10:00 AM',
      aircraft: 'Agusta AW139'
    },
    passengers: [
      { firstName: 'John', lastName: 'Smith', isMainPassenger: true },
      { firstName: 'Jane', lastName: 'Smith', isMainPassenger: false }
    ],
    pickup: {
      time: '9:30 AM',
      location: '1100 Collins Ave, Miami Beach, FL 33139',
      vehicle: 'Cadillac Escalade ESV'
    },
    totalPaid: '$2,835'
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Booking Confirmed</h2>
        <p className="text-muted-foreground">
          Your luxury helicopter journey has been successfully booked.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>
                    Booking ID: {bookingData.bookingId}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Printer className="h-4 w-4" />
                    <span className="hidden sm:inline">Print</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Plane className="h-4 w-4" />
                    Flight Details
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Route</div>
                      <div className="font-medium">{bookingData.flightDetails.from} → {bookingData.flightDetails.to}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Date & Time</div>
                      <div className="font-medium">{bookingData.flightDetails.date} • {bookingData.flightDetails.time}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Aircraft</div>
                      <div className="font-medium">{bookingData.flightDetails.aircraft}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Status</div>
                      <div className="font-medium text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {bookingData.status}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-primary font-medium flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4" />
                    Passengers ({bookingData.passengers.length})
                  </div>
                  <div className="space-y-2">
                    {bookingData.passengers.map((passenger, index) => (
                      <div key={index} className="text-sm flex items-baseline gap-2">
                        <span className="font-medium">{passenger.firstName} {passenger.lastName}</span>
                        {passenger.isMainPassenger && (
                          <span className="text-xs bg-primary/10 text-primary py-0.5 px-1.5 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-primary font-medium flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4" />
                    Pickup Information
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Time</div>
                      <div className="font-medium">{bookingData.pickup.time}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Location</div>
                      <div className="font-medium">{bookingData.pickup.location}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Vehicle</div>
                      <div className="font-medium">{bookingData.pickup.vehicle}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-primary font-medium flex items-center gap-2 mb-3">
                    <Wallet className="h-4 w-4" />
                    Payment Details
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span>•••• •••• •••• 4242</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Paid</span>
                      <span className="font-medium">{bookingData.totalPaid}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-start gap-4 text-sm text-muted-foreground">
            <div className="shrink-0 mt-1">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="mb-2">
                A confirmation email has been sent to {user?.email} with all the details of your booking.
              </p>
              <p>
                Our concierge team will contact you 24 hours before your flight to confirm all arrangements.
                If you need to make any changes to your booking, please contact us at least 48 hours in advance.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex justify-between items-center">
                <span>Digital Pass</span>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <Share2 className="h-3.5 w-3.5 mr-1" />
                  Share
                </Button>
              </CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Present at check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-white p-3 text-black">
                <div className="flex items-center gap-2 border-b pb-2 mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                    H
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">HELO Luxury Air Mobility</div>
                    <div className="font-medium">Helicopter Booking Pass</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-gray-500">Booking ID</div>
                    <div className="font-medium">{bookingData.bookingId}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-gray-500">Route</div>
                    <div className="font-medium">{bookingData.flightDetails.from} → {bookingData.flightDetails.to}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-gray-500">Date & Time</div>
                    <div className="font-medium">{bookingData.flightDetails.date}, {bookingData.flightDetails.time}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-gray-500">Primary Passenger</div>
                    <div className="font-medium">
                      {bookingData.passengers.find(p => p.isMainPassenger)?.firstName} {bookingData.passengers.find(p => p.isMainPassenger)?.lastName}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col items-center">
                  <div className="mb-2 bg-gray-100 p-2 rounded">
                    {/* Using placeholder QR code image */}
                    <svg
                      viewBox="0 0 200 200"
                      width="160"
                      height="160"
                      className="mx-auto"
                    >
                      <rect width="200" height="200" fill="#ffffff" />
                      <path
                        d="M30,30h40v40h-40z M40,40h20v20h-20z M80,30h10v10h-10z M100,30h10v10h-10z M120,30h10v10h-10z M130,30h40v40h-40z M140,40h20v20h-20z M30,80h10v10h-10z M50,80h10v10h-10z M70,80h10v10h-10z M90,80h10v10h-10z M110,80h10v10h-10z M150,80h10v10h-10z M170,80h10v10h-10z M30,100h10v10h-10z M50,100h10v10h-10z M90,100h30v10h-30z M130,100h10v10h-10z M150,100h10v10h-10z M170,100h10v10h-10z M30,120h10v10h-10z M70,120h10v10h-10z M90,120h10v10h-10z M110,120h10v10h-10z M130,120h10v10h-10z M150,120h10v10h-10z M30,130h40v40h-40z M40,140h20v20h-20z M80,130h10v10h-10z M100,130h10v10h-10z M120,130h10v10h-10z M140,130h10v10h-10z M160,130h10v10h-10z M130,140h40v30h-40z M140,150h20v10h-20z"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-500 text-[10px]">Scan to verify boarding pass</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center bg-muted">
              <Button className="w-full gap-2" size="sm">
                <Wallet className="h-4 w-4" />
                Add to Apple Wallet
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Assistance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Our concierge team is available 24/7 to assist you with any questions or special requests.
              </p>
              <Button variant="outline" className="w-full">
                Contact Concierge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
} 