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
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Plane, 
  Users, 
  Car, 
  Clock, 
  CalendarIcon,
  MapPin,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default async function BookingSummaryPage() {
  // Get the authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Mock booking summary data - in production this would come from session/state
  const bookingData = {
    flightDetails: {
      from: 'Miami Beach',
      to: 'Palm Beach',
      date: 'May 15, 2024',
      time: '10:00 AM',
      aircraft: 'Agusta AW139',
      basePrice: 2500
    },
    passengers: [
      { firstName: 'John', lastName: 'Smith', isMainPassenger: true },
      { firstName: 'Jane', lastName: 'Smith', isMainPassenger: false }
    ],
    groundTransport: {
      pickup: {
        vehicle: 'Cadillac Escalade ESV',
        address: '1100 Collins Ave, Miami Beach, FL 33139',
        price: 250
      },
      destination: {
        vehicle: 'Cadillac Escalade ESV',
        address: '350 Royal Palm Way, Palm Beach, FL 33480',
        price: 250
      }
    },
    pricing: {
      flightBase: 2500,
      passengerFee: 150,
      groundTransport: 500,
      subtotal: 3150,
      membershipDiscount: -315,
      total: 2835
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Booking Summary</h2>
        <p className="text-muted-foreground">
          Review and confirm your luxury travel details
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Route
                  </dt>
                  <dd className="font-medium">
                    {bookingData.flightDetails.from} → {bookingData.flightDetails.to}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Date & Time
                  </dt>
                  <dd className="font-medium">
                    {bookingData.flightDetails.date} • {bookingData.flightDetails.time}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Passengers
                  </dt>
                  <dd className="font-medium">
                    {bookingData.passengers.length} {bookingData.passengers.length === 1 ? 'Passenger' : 'Passengers'}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Aircraft
                  </dt>
                  <dd className="font-medium">
                    {bookingData.flightDetails.aircraft}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passenger Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingData.passengers.map((passenger, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {passenger.firstName} {passenger.lastName}
                          {passenger.isMainPassenger && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary py-0.5 px-1.5 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Documents verified
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ground Transportation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <Car className="h-4 w-4 text-primary" />
                    Pickup Transportation
                  </div>
                  <div className="text-sm pl-6 space-y-1">
                    <div>{bookingData.groundTransport.pickup.vehicle}</div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {bookingData.groundTransport.pickup.address}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      30 minutes before departure
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <Car className="h-4 w-4 text-primary" />
                    Destination Transportation
                  </div>
                  <div className="text-sm pl-6 space-y-1">
                    <div>{bookingData.groundTransport.destination.vehicle}</div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {bookingData.groundTransport.destination.address}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Waiting on arrival
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Flight Base Price</span>
                  <span>${bookingData.pricing.flightBase}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Passenger Fee</span>
                  <span>${bookingData.pricing.passengerFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ground Transportation</span>
                  <span>${bookingData.pricing.groundTransport}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${bookingData.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-primary">
                  <span>Elite Membership Discount (10%)</span>
                  <span>${bookingData.pricing.membershipDiscount}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${bookingData.pricing.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 border rounded-lg">
                  <input
                    type="radio"
                    id="saved-card"
                    name="payment-method"
                    className="h-4 w-4 text-primary border-primary focus:ring-primary"
                    checked
                    readOnly
                  />
                  <label htmlFor="saved-card" className="ml-2 flex-1">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <div className="text-xs bg-muted py-0.5 px-1.5 rounded">Default</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Expires 12/25</div>
                  </label>
                </div>

                <Button variant="outline" className="w-full text-sm flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>

          <form action="/dashboard/book/confirmation">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg">Total</div>
                    <div className="font-bold text-lg">${bookingData.pricing.total}</div>
                  </div>
                  <p className="text-xs opacity-90">
                    By clicking "Confirm Booking", you agree to our terms and conditions, including our cancellation policy.
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-background text-foreground hover:bg-background/90"
                  size="lg"
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </form>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div>
              Your payment is secured with enterprise-grade encryption. HELO uses 
              the highest standards of data protection.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard/book/transport" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Ground Transport
          </Link>
        </Button>
      </div>
    </div>
  )
} 