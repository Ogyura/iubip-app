"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../services/api"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "applicant" | "parent" | "admin"
  avatar?: string
}

interface AuthContextData {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, phone: string, password: string, role: "applicant" | "parent") => Promise<void>
  signOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem("@IUBIP:user")
      const storedToken = await AsyncStorage.getItem("@IUBIP:token")

      if (storedUser && storedToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
        setUser(JSON.parse(storedUser))
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await api.post('/auth/login', { email, password });

      // Имитация ответа от сервера
      const response = {
        data: {
          user: {
            id: "1",
            name: "Иван Иванов",
            email: email,
            phone: "+7 (999) 123-45-67",
            role: "applicant",
          },
          token: "fake-jwt-token",
        },
      }

      const { user, token } = response.data

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      await AsyncStorage.setItem("@IUBIP:user", JSON.stringify(user))
      await AsyncStorage.setItem("@IUBIP:token", token)

      setUser(user)
    } catch (error) {
      throw new Error("Ошибка при входе в систему")
    }
  }

  const signUp = async (name: string, email: string, phone: string, password: string, role: "applicant" | "parent") => {
    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await api.post('/auth/register', { name, email, phone, password, role });

      // Имитация ответа от сервера
      const response = {
        data: {
          user: {
            id: "1",
            name,
            email,
            phone,
            role,
          },
          token: "fake-jwt-token",
        },
      }

      const { user, token } = response.data

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      await AsyncStorage.setItem("@IUBIP:user", JSON.stringify(user))
      await AsyncStorage.setItem("@IUBIP:token", token)

      setUser(user)
    } catch (error) {
      throw new Error("Ошибка при регистрации")
    }
  }

  const signOut = async () => {
    await AsyncStorage.removeItem("@IUBIP:user")
    await AsyncStorage.removeItem("@IUBIP:token")
    setUser(null)
    api.defaults.headers.common["Authorization"] = ""
  }

  const forgotPassword = async (email: string) => {
    try {
      // В реальном приложении здесь будет запрос к API
      // await api.post('/auth/forgot-password', { email });

      // Имитация успешного запроса
      return
    } catch (error) {
      throw new Error("Ошибка при восстановлении пароля")
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await api.put('/users/profile', data);

      // Имитация ответа от сервера
      const updatedUser = { ...user, ...data }

      await AsyncStorage.setItem("@IUBIP:user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      throw new Error("Ошибка при обновлении профиля")
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, forgotPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
