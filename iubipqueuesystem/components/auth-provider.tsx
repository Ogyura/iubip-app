"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      if (email === "admin@iubip.ru" && password === "admin123") {
        const adminUser = {
          id: "1",
          name: "Администратор",
          email: "admin@iubip.ru",
          role: "admin" as const,
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        toast({
          title: "Успешный вход",
          description: "Вы вошли как администратор",
        })
        router.push("/dashboard")
      } else if (email === "user@iubip.ru" && password === "user123") {
        const regularUser = {
          id: "2",
          name: "Иванов Иван",
          email: "user@iubip.ru",
          role: "user" as const,
        }
        setUser(regularUser)
        localStorage.setItem("user", JSON.stringify(regularUser))
        toast({
          title: "Успешный вход",
          description: "Вы успешно вошли в систему",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: "Произошла ошибка при входе в систему",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration logic
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        role: "user" as const,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      toast({
        title: "Регистрация успешна",
        description: "Вы успешно зарегистрировались в системе",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Ошибка регистрации",
        description: "Произошла ошибка при регистрации",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    })
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}
