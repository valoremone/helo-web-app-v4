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
import { Check, Crown, Shield, Star } from 'lucide-react'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

const membershipTiers = [
  {
    name: 'Premier',
    price: '$5,000',
    period: 'monthly',
    description: 'For the discerning executive who demands the best',
    features: [
      'Priority booking up to 4 hours in advance',
      'Access to HELO lounges in major cities',
      'Complimentary black car service for all flights',
      '5 complimentary guest passes annually',
      'Standard concierge service'
    ],
    icon: Shield
  },
  {
    name: 'Elite',
    price: '$12,500',
    period: 'monthly',
    description: 'Our signature membership with exclusive benefits',
    featured: true,
    features: [
      'Priority booking up to 1 hour in advance',
      'VIP access to all HELO lounges and facilities',
      'Premium black car service with security options',
      'Unlimited guest passes with approval',
      'Dedicated concierge team and account manager',
      'Access to partner clubs and exclusive events',
      'Complimentary helicopter tours for special occasions'
    ],
    icon: Crown
  },
  {
    name: 'Select',
    price: '$2,500',
    period: 'monthly',
    description: 'Entry-level access to the HELO experience',
    features: [
      'Booking up to 24 hours in advance',
      'Limited access to HELO lounges',
      'Discounted black car service',
      'Pay-per-use guest access',
      'Standard concierge service'
    ],
    icon: Star
  }
]

export default async function MembershipPage() {
  // Get the authenticated user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // In production, fetch user membership details from Supabase
  // const { data: membership } = await supabase
  //   .from('memberships')
  //   .select('*')
  //   .eq('user_id', user?.id)
  //   .single()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Membership</h2>
        <p className="text-muted-foreground">
          Explore your membership benefits and options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {membershipTiers.map((tier) => {
          const Icon = tier.icon
          return (
            <Card 
              key={tier.name} 
              className={`flex flex-col ${tier.featured ? 'border-primary shadow-lg' : ''}`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <Icon className={`h-6 w-6 ${tier.featured ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">/{tier.period}</span>
                </div>
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={tier.featured ? 'default' : 'outline'}
                >
                  {tier.featured ? 'Upgrade Now' : 'Select Plan'}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authorized Users</CardTitle>
          <CardDescription>
            Add family members or assistants to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You currently have no authorized users. Add users to allow them to book flights on your behalf.
          </p>
          <Button>Add Authorized User</Button>
        </CardContent>
      </Card>
    </div>
  )
} 