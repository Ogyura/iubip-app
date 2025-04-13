"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { QueueList } from "@/components/queue-list"
import { QueueForm } from "@/components/queue-form"
import { BarChart3, Calendar, Clock, FileText, LayoutDashboard, Settings, User, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    upcomingAppointments: 0,
    nextAppointment: null as null | { date: string; time: string; type: string },
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }

    // Mock stats data
    if (user) {
      setStats({
        totalAppointments: 5,
        completedAppointments: 3,
        upcomingAppointments: 2,
        nextAppointment: {
          date: "2025-04-15",
          time: "10:00",
          type: "consultation",
        },
      })
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-primary">Личный кабинет</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            <User className="h-4 w-4" />
            <span>{user.name}</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Всего записей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalAppointments}</div>
              <Progress value={(stats.completedAppointments / stats.totalAppointments) * 100} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {stats.completedAppointments} завершено, {stats.upcomingAppointments} предстоит
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            {stats.nextAppointment ? (
              <>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Ближайшая запись
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      {stats.nextAppointment.type === "consultation" ? (
                        <Users className="h-6 w-6 text-primary" />
                      ) : (
                        <FileText className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {stats.nextAppointment.type === "consultation" ? "Консультация" : "Подача документов"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(stats.nextAppointment.date).toLocaleDateString("ru-RU")} в{" "}
                        {stats.nextAppointment.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Нет предстоящих записей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">У вас нет предстоящих записей в очереди</p>
                </CardContent>
              </>
            )}
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Активность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Последний месяц</span>
                  <span className="font-medium">+{stats.totalAppointments}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-3/5 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-queue" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="my-queue" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Мои записи
            </TabsTrigger>
            <TabsTrigger value="new-queue" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Новая запись
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-queue" className="mt-6">
            <QueueList />
          </TabsContent>
          <TabsContent value="new-queue" className="mt-6">
            <QueueForm />
          </TabsContent>
        </Tabs>

        {user.role === "admin" && (
          <Card className="mt-6 border-primary/20 shadow-md">
            <CardHeader className="bg-primary/5 dark:bg-primary/10 rounded-t-lg">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                <CardTitle>Панель администратора</CardTitle>
              </div>
              <CardDescription>Управление электронной очередью и пользователями</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Управление очередью</h3>
                    <p className="text-sm text-muted-foreground">Просмотр и редактирование всех записей</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Управление пользователями</h3>
                    <p className="text-sm text-muted-foreground">Добавление и редактирование пользователей</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group" onClick={() => router.push("/admin")}>
                <LayoutDashboard className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Перейти в панель администратора
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  )
}
