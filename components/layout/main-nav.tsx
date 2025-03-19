'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, Home, Calendar, Users, Settings, Headphones } from 'lucide-react'

import { cn } from '@/components/lib/utils'
import { useAuth } from '@/components/providers/auth-provider'

const memberLinks = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Book Flight',
    href: '/dashboard/book',
    icon: Plane,
  },
  {
    title: 'My Bookings',
    href: '/dashboard/bookings',
    icon: Calendar,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: Users,
  },
  {
    title: 'Support',
    href: '/dashboard/support',
    icon: Headphones,
  },
]

const adminLinks = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()
  const { isAdmin } = useAuth()
  const links = isAdmin ? adminLinks : memberLinks

  return (
    <nav className="flex flex-col gap-2 p-4">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              pathname === link.href ? 'bg-accent' : 'transparent'
            )}
          >
            <Icon className="h-4 w-4" />
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
} 