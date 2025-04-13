"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { ModeToggle } from "@/components/mode-toggle"
import { LayoutDashboard, LogIn, LogOut, Menu, UserPlus, Clock, Home, Info } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const routes = [
    {
      href: "/",
      label: "Главная",
      icon: <Home className="h-4 w-4 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/queue",
      label: "Электронная очередь",
      icon: <Clock className="h-4 w-4 mr-2" />,
      active: pathname === "/queue",
    },
    {
      href: "/about",
      label: "О системе",
      icon: <Info className="h-4 w-4 mr-2" />,
      active: pathname === "/about",
    },
  ]

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    route.active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ИУБиП
          </span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Личный кабинет
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => logout()} className="flex items-center">
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Выйти</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Войти
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="flex items-center">
                <UserPlus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Регистрация</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
