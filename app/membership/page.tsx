import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import Link from "next/link";
import { Check } from "lucide-react";

const membershipPlans = [
  {
    name: "Starter",
    price: "4,950",
    description: "Perfect for occasional travelers",
    features: [
      "5 flight credits",
      "Premium lounge access",
      "Standard booking window",
      "Basic concierge services",
    ],
    ctaHref: "/sign-up",
  },
  {
    name: "Executive",
    price: "9,995",
    description: "For frequent luxury travelers",
    features: [
      "15 flight credits",
      "Premium lounge access",
      "Priority booking window",
      "Enhanced concierge services",
      "VIP event access",
      "Partner club benefits",
    ],
    ctaHref: "/sign-up",
    highlighted: true,
  },
  {
    name: "Elite",
    price: "18,900",
    description: "Ultimate luxury experience",
    features: [
      "30 flight credits",
      "Premium lounge access",
      "Priority booking window",
      "24/7 dedicated concierge",
      "Unlimited VIP event access",
      "Full partner club benefits",
      "Custom flight arrangements",
    ],
    ctaHref: "/sign-up",
  },
];

export default function MembershipPage() {
  return (
    <>
      <Header />
      <main className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Membership Plans</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the membership that fits your luxury travel needs.
              All plans include access to our fleet of Agusta helicopters and premium services.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {membershipPlans.map((plan) => (
              <Card key={plan.name} className={plan.highlighted ? "border-primary shadow-lg" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/year</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    <Link href={plan.ctaHref}>
                      Choose {plan.name}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 