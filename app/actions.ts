"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error.code + " " + error.message);
      
      const isAuthServiceError = 
        error.message?.includes('upstream') || 
        error.message?.includes('invalid response') ||
        error.message?.includes('auth service') ||
        error.message?.includes('migration') ||
        error.status === 500;
        
      // Special handling for potential Supabase reactivation issues
      if (isAuthServiceError) {
        return encodedRedirect(
          "error",
          "/sign-up",
          "Authentication service error. Your Supabase project may have been recently reactivated. Please visit the diagnostic page to reset your auth state."
        );
      }
      
      return encodedRedirect("error", "/sign-up", error.message);
    } else {
      return encodedRedirect(
        "success",
        "/sign-up",
        "Thanks for signing up! Please check your email for a verification link.",
      );
    }
  } catch (error: unknown) {
    console.error("Unexpected sign-up error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return encodedRedirect(
      "error",
      "/sign-up",
      errorMessage
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      const isAuthServiceError = 
        error.message?.includes('upstream') || 
        error.message?.includes('invalid response') ||
        error.message?.includes('auth service') ||
        error.message?.includes('migration') ||
        error.status === 500;
        
      // Special handling for potential Supabase reactivation issues
      if (isAuthServiceError) {
        console.error("Potential Supabase reactivation issue:", error.message);
        return redirect(`/sign-in?error=${encodeURIComponent("Authentication service error. Your Supabase project may have been recently reactivated. Please try resetting your auth state.")}`);
      }
      
      return redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/", "layout");
    redirect("/protected");
  } catch (error: unknown) {
    console.error("Unexpected sign-in error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return redirect(`/sign-in?error=${encodeURIComponent(errorMessage)}`);
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  // We're capturing confirmPassword but not using it directly in this function
  // It's typically validated client-side or could be used for additional validation
  // Including the type to document the expected form field
  const _confirmPassword = formData.get("confirmPassword") as string;

  if (!password) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password is required"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  return encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};
