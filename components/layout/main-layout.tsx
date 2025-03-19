'use client'

import { useAuth } from '@/components/providers/auth-provider'
import { MainNav } from '@/components/layout/main-nav'
import { UserMenu } from '@/components/layout/user-menu'
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { HeliportIcon } from '@/components/icons/heliport'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth()

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar>
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <HeliportIcon className="h-6 w-6" />
              <span className="ml-2 text-lg font-semibold">HELO</span>
            </div>
            <MainNav />
            <div className="mt-auto flex flex-col gap-4 p-4 border-t">
              <div className="flex items-center justify-between">
                <UserMenu />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </Sidebar>
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 