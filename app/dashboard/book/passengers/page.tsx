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
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { UserRound, Calendar, Weight, FileText, Plus, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

// Form schema
const formSchema = z.object({
  passenger1: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    weight: z.string().min(1, "Weight is required"),
  }),
  passenger2: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    dob: z.string().optional(),
    weight: z.string().optional(),
  }),
})

export default function PassengerDetailsPage() {
  const [passengerCount, setPassengerCount] = useState(2)
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
      passenger1: {
        firstName: '',
        lastName: '',
        dob: '',
        weight: '',
      },
      passenger2: {
        firstName: '',
        lastName: '',
        dob: '',
        weight: '',
      },
    },
  })
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // Navigate to the next page
    router.push('/dashboard/book/transport')
  }
  
  const useProfile = () => {
    if (user) {
      form.setValue('passenger1.firstName', user.user_metadata?.first_name || '');
      form.setValue('passenger1.lastName', user.user_metadata?.last_name || '');
    }
  }
  
  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Passenger Details</h2>
        <p className="text-muted-foreground">
          Provide information for each passenger
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
          <CardDescription>
            Please enter details for all passengers that will be flying
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Passenger 1 - Primary */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Passenger 1 (Primary)</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    type="button" 
                    className="text-primary"
                    onClick={useProfile}
                  >
                    Use my profile
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="passenger1.firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="John" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="passenger1.lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="Smith" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="passenger1.dob"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" type="date" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="passenger1.weight"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Estimated Weight (lbs)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" type="number" placeholder="185" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>Required for aircraft weight and balance</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>ID Upload</FormLabel>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      Drag and drop or click to upload a photo ID
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Valid government-issued photo ID required (license, passport)
                    </div>
                    <Button variant="outline" type="button" size="sm">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Passenger 2 */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Passenger 2</h3>
                  <Button variant="ghost" size="sm" type="button" className="text-destructive">
                    Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="passenger2.firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="Jane" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="passenger2.lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="Smith" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="passenger2.dob"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" type="date" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="passenger2.weight"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Estimated Weight (lbs)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" type="number" placeholder="150" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>ID Upload</FormLabel>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      Drag and drop or click to upload a photo ID
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Valid government-issued photo ID required (license, passport)
                    </div>
                    <Button variant="outline" type="button" size="sm">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button type="button" variant="outline" className="w-full flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Another Passenger
              </Button>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/book" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Flight Details
                  </Link>
                </Button>
                <Button type="submit" size="lg" className="flex items-center gap-2">
                  Continue to Ground Transport
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Benefits of Saving Passenger Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Save your passenger information for quicker booking in the future.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Faster checkout process on future bookings</li>
              <li>Store multiple passenger profiles for family and associates</li>
              <li>Secure storage of information with enterprise-grade encryption</li>
            </ul>
            <Button variant="outline" size="sm" type="button">
              Save passenger profiles
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 