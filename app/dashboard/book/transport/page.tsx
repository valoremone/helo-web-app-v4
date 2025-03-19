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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Car, 
  Timer, 
  Shield, 
  ArrowLeft, 
  ArrowRight,
  TicketCheck,
  Truck 
} from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

// Vehicle options for ground transportation
const vehicleOptions = [
  {
    id: 'escalade',
    name: 'Cadillac Escalade ESV',
    description: 'Luxury SUV with spacious interior, ideal for up to 6 passengers',
    features: ['Premium leather seats', 'Privacy glass', 'WiFi connectivity', 'Premium sound system'],
    price: 250,
    image: '/escalade.jpg',
    icon: Car
  },
  {
    id: 'sprinter',
    name: 'Mercedes-Benz Sprinter',
    description: 'Executive van with standing headroom and premium amenities',
    features: ['Seating for up to 8 passengers', 'Conference style seating', 'LED ambient lighting', 'Integrated tables'],
    price: 350,
    image: '/sprinter.jpg',
    icon: Truck
  },
  {
    id: 'bulletproof-escalade',
    name: 'Bulletproof Escalade',
    description: 'Armored luxury SUV with B6 level protection and enhanced security features',
    features: ['Ballistic protection', 'Run-flat tires', 'Reinforced chassis', 'Secure communication systems'],
    price: 500,
    image: '/bulletproof-escalade.jpg',
    icon: Shield
  }
]

export default async function GroundTransportPage() {
  // Get the authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ground Transportation</h2>
        <p className="text-muted-foreground">
          Select luxury ground transportation for your journey
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transportation Options</CardTitle>
          <CardDescription>
            Choose premium ground transportation to and from the helipad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/dashboard/book/summary" className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Pickup Transportation</h3>
                <div className="text-sm text-muted-foreground">30 minutes before departure</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Pickup Location</span>
                </div>
                <Input 
                  placeholder="Enter pickup address" 
                  name="pickupAddress" 
                  className="w-full md:w-2/3"
                />
              </div>
              
              <RadioGroup defaultValue="escalade" className="space-y-4">
                {vehicleOptions.map((vehicle) => {
                  const Icon = vehicle.icon
                  return (
                    <div 
                      key={vehicle.id} 
                      className="border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value={vehicle.id} id={`pickup-${vehicle.id}`} className="mt-1" />
                        <div className="flex-1">
                          <label 
                            htmlFor={`pickup-${vehicle.id}`} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5 text-primary" />
                              <span className="font-medium">{vehicle.name}</span>
                            </div>
                            <div className="text-primary font-medium">${vehicle.price}</div>
                          </label>
                          <p className="text-sm text-muted-foreground mt-1">{vehicle.description}</p>
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            {vehicle.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <TicketCheck className="h-3 w-3 text-primary" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Destination Transportation</h3>
                <div className="text-sm text-muted-foreground">Waiting on arrival</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Destination Address</span>
                </div>
                <Input 
                  placeholder="Enter destination address" 
                  name="destinationAddress" 
                  className="w-full md:w-2/3"
                />
              </div>
              
              <RadioGroup defaultValue="escalade" className="space-y-4">
                {vehicleOptions.map((vehicle) => {
                  const Icon = vehicle.icon
                  return (
                    <div 
                      key={vehicle.id} 
                      className="border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value={vehicle.id} id={`destination-${vehicle.id}`} className="mt-1" />
                        <div className="flex-1">
                          <label 
                            htmlFor={`destination-${vehicle.id}`} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5 text-primary" />
                              <span className="font-medium">{vehicle.name}</span>
                            </div>
                            <div className="text-primary font-medium">${vehicle.price}</div>
                          </label>
                          <p className="text-sm text-muted-foreground mt-1">{vehicle.description}</p>
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            {vehicle.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <TicketCheck className="h-3 w-3 text-primary" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="same-vehicle" />
                <label
                  htmlFor="same-vehicle"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use same vehicle for pickup and destination
                </label>
              </div>
            </div>
            
            <Card className="bg-muted/50 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Timer className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">HELO Concierge Coordination</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our concierge team will coordinate all ground transportation timing with your flight schedule. 
                      Ground transportation will be ready 30 minutes before your scheduled departure and waiting upon your arrival.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" asChild>
                <Link href="/dashboard/book/passengers" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Passenger Details
                </Link>
              </Button>
              <Button type="submit" size="lg" className="flex items-center gap-2">
                Continue to Booking Summary
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 