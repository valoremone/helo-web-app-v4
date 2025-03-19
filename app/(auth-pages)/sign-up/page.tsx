import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Plane } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ message?: Message }>
}

export default async function SignUpPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {params?.message ? (
        <FormMessage message={params.message} />
      ) : (
        <>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <Plane className="mr-2 h-6 w-6" />
              HELO
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  "Experience luxury air mobility redefined. Join HELO for exclusive access to on-demand helicopter travel and premium services."
                </p>
                <footer className="text-sm">Sofia Davis, HELO Member</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <form action={signUpAction}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <Button className="w-full">Sign Up</Button>
                </div>
              </form>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline hover:text-foreground">
                  Sign In
                </Link>
              </p>
              <SmtpMessage />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
