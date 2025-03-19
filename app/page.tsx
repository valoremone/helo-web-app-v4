import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plane, Shield, Clock, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    name: 'On-Demand Luxury',
    description: 'Book your private helicopter with as little as 1-hour advance notice.',
    icon: Clock,
  },
  {
    name: 'Premium Fleet',
    description: 'Experience luxury travel in our fleet of Agusta helicopters.',
    icon: Plane,
  },
  {
    name: 'Exclusive Benefits',
    description: 'Access VIP lounges, events, and partner clubs with your membership.',
    icon: Star,
  },
  {
    name: 'Secure Transport',
    description: 'Door-to-door service with our armored Cadillac Escalade fleet.',
    icon: Shield,
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <div className="relative isolate">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 sm:pt-40 lg:px-8 lg:pt-44">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Luxury Air Mobility for the Modern Elite
                </h1>
                <p className="relative mt-6 text-lg leading-8 text-muted-foreground sm:max-w-md lg:max-w-none">
                  Experience unparalleled luxury with HELO's vertically integrated air mobility platform. 
                  From on-demand helicopter flights to exclusive member benefits, we redefine premium travel.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button asChild size="lg">
                    <Link href="/sign-in">
                      Book Your Flight
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link href="/sign-up">Become a Member</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Helicopter interior"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={400}
                      height={600}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Luxury lounge"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={400}
                      height={600}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1589793907316-f94025b46850?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Helicopter exterior"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={400}
                      height={600}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Premium Experience</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Elevate Your Travel Experience
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              HELO offers a comprehensive luxury travel solution with our vertically integrated platform,
              combining premium air mobility with exclusive benefits.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </>
  )
}
