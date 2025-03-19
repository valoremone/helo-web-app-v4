import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

interface PageProps {
  searchParams: Promise<{ message?: Message }>
}

export default async function ForgotPassword({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form action={forgotPasswordAction}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
            />
            {params?.message && <FormMessage message={params.message} />}
            <Button className="mt-4">
              Send Reset Link
            </Button>
          </div>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          Remember your password?{" "}
          <Link href="/sign-in" className="underline hover:text-foreground">
            Sign In
          </Link>
        </p>
      </div>
      <SmtpMessage />
    </>
  );
}
