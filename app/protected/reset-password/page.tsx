import { resetPasswordAction } from "@/app/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Create Supabase client
  const supabase = await createClient();

  // Get user session
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // If no user is logged in, redirect to login
    redirect("/sign-in");
  }

  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;

  const message: Message | undefined = 
    typeof resolvedSearchParams.message === 'string' ? { message: resolvedSearchParams.message } :
    typeof resolvedSearchParams.error === 'string' ? { error: resolvedSearchParams.error } :
    typeof resolvedSearchParams.success === 'string' ? { success: resolvedSearchParams.success } :
    undefined;

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form action={resetPasswordAction}>
        <div className="grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          {message && <FormMessage message={message} />}
          <Button className="mt-4">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}
