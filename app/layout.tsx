import "./globals.css"
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Metadata } from 'next'
import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HELO - Luxury Air Mobility",
  description: "Experience unparalleled luxury with HELO's vertically integrated air mobility platform.",
  openGraph: {
    title: "HELO Luxury Air Mobility",
    description: "Experience luxury air travel with HELO - Your premium helicopter charter service.",
    url: "https://flyhelo.one",
    siteName: "HELO",
    images: [
      {
        url: "https://flyhelo.one/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HELO Luxury Air Mobility",
    description: "Experience luxury air travel with HELO - Your premium helicopter charter service.",
    images: ["https://flyhelo.one/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        GeistSans.className
      )}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
