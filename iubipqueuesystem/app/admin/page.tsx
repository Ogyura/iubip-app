"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { AdminQueueList } from "@/components/admin-queue-list"
import { AdminKioskSettings } from "@/components/admin-kiosk-settings"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading || !user || user.role !== "admin") {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Панель администратора</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Управление электронной очередью</CardTitle>
            <CardDescription>Управляйте записями, настройками киоска и уведомлениями</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="grid w-full md:w-[600px] grid-cols-3">
            <TabsTrigger value="queue">Очередь</TabsTrigger>
            <TabsTrigger value="kiosk">Настройки киоска</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          </TabsList>
          <TabsContent value="queue" className="mt-6">
            <AdminQueueList />
          </TabsContent>
          <TabsContent value="kiosk" className="mt-6">
            <AdminKioskSettings />
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
                <CardDescription>Настройте параметры уведомлений для пользователей</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Функционал настройки уведомлений находится в разработке.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
