'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Plane, 
  CalendarIcon, 
  Clock, 
  Users, 
  ArrowRight,
  ArrowRightLeft,
  MapPin
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

// Mock data for helicopter routes
const heliRoutes = [
  { id: '1', from: 'Miami Beach', to: 'Palm Beach', price: 2500 },
  { id: '2', from: 'Downtown Miami', to: 'Fisher Island', price: 1500 },
  { id: '3', from: 'Miami Beach', to: 'Fort Lauderdale', price: 1800 },
  { id: '4', from: 'South Beach', to: 'Key Biscayne', price: 1200 },
  { id: '5', from: 'Fort Lauderdale', to: 'Naples', price: 3500 },
  { id: '6', from: 'Miami Beach', to: 'Key West', price: 4500 }
]

// Available departure times
const departureTimes = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
]

// Form schema
const formSchema = z.object({
  tripType: z.enum(['one-way', 'round-trip']),
  departure: z.string({
    required_error: "Please select a departure location",
  }),
  destination: z.string({
    required_error: "Please select a destination",
  }),
  departureDate: z.date({
    required_error: "Please select a date",
  }),
  departureTime: z.string({
    required_error: "Please select a time",
  }),
  returnDate: z.date().optional(),
  returnTime: z.string().optional(),
  passengerCount: z.string(),
  aircraft: z.string(),
})

export default function BookFlightPage() {
  const [tripType, setTripType] = useState('one-way')
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  useEffect(() => {
    async function getUser() {
      setIsLoading(true)
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
      }
      setIsLoading(false)
    }
    
    getUser()
  }, [supabase])
  
  // Define form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripType: 'one-way',
      departure: '',
      destination: '',
      passengerCount: '1',
      aircraft: 'aw139',
    },
  })
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // Navigate to the next page
    router.push('/dashboard/book/passengers')
  }
  
  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Book a Flight</h2>
        <p className="text-muted-foreground">
          Schedule your next luxury helicopter journey
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flight Details</CardTitle>
          <CardDescription>
            Select your route, date, and time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Trip Type Selection */}
              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Trip Type</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={(value) => {
                          field.onChange(value)
                          setTripType(value)
                        }} 
                        defaultValue={field.value} 
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="one-way" id="one-way" />
                          <label htmlFor="one-way" className="flex items-center gap-1.5 cursor-pointer">
                            <ArrowRight className="h-4 w-4" />
                            <span>One-way</span>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="round-trip" id="round-trip" />
                          <label htmlFor="round-trip" className="flex items-center gap-1.5 cursor-pointer">
                            <ArrowRightLeft className="h-4 w-4" />
                            <span>Round-trip</span>
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Route Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="departure"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>From</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select departure location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="miami-beach">Miami Beach</SelectItem>
                          <SelectItem value="downtown-miami">Downtown Miami</SelectItem>
                          <SelectItem value="south-beach">South Beach</SelectItem>
                          <SelectItem value="fort-lauderdale">Fort Lauderdale</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>To</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="palm-beach">Palm Beach</SelectItem>
                          <SelectItem value="fisher-island">Fisher Island</SelectItem>
                          <SelectItem value="fort-lauderdale">Fort Lauderdale</SelectItem>
                          <SelectItem value="key-biscayne">Key Biscayne</SelectItem>
                          <SelectItem value="naples">Naples</SelectItem>
                          <SelectItem value="key-west">Key West</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Departure Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="departureTime"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Departure Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departureTimes.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Return Date (only shown for round-trip) */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${tripType === 'round-trip' ? 'block' : 'hidden'}`}>
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Return Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="returnTime"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Return Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departureTimes.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Passenger Count */}
              <FormField
                control={form.control}
                name="passengerCount"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Number of Passengers</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full md:w-1/3">
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4 Passengers</SelectItem>
                        <SelectItem value="5">5 Passengers</SelectItem>
                        <SelectItem value="6">6 Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Aircraft Type */}
              <FormField
                control={form.control}
                name="aircraft"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Aircraft</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full md:w-1/2">
                          <SelectValue placeholder="Select aircraft" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aw139">Agusta AW139 (6 passengers)</SelectItem>
                        <SelectItem value="aw109">Agusta AW109 (4 passengers)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      All aircraft feature luxurious interiors and are operated by our experienced pilots
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full md:w-auto" size="lg">
                Continue to Passenger Details
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Helipads</CardTitle>
          <CardDescription>
            Our luxury transportation network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Miami Beach Marina
              </div>
              <p className="text-sm text-muted-foreground">
                300 Alton Road, Miami Beach, FL 33139
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Downtown Miami Heliport
              </div>
              <p className="text-sm text-muted-foreground">
                1000 Biscayne Blvd, Miami, FL 33132
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Fisher Island Helipad
              </div>
              <p className="text-sm text-muted-foreground">
                1 Fisher Island Dr, Miami Beach, FL 33109
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Fort Lauderdale Heliport
              </div>
              <p className="text-sm text-muted-foreground">
                1100 Lee Wagener Blvd, Fort Lauderdale, FL 33315
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 