"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Calendar, Clock, RefreshCw, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QRCodeSVG } from "qrcode.react"

type QueueItem = {
  id: string
  type: "consultation" | "documents"
  queueNumber: number
  status: "waiting" | "current" | "completed"
  estimatedTime: string
  estimatedMinutes: number
}

export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentNumber, setCurrentNumber] = useState(3)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState({
    waiting: 0,
    completed: 0,
    avgWaitTime: 0,
  })

  useEffect(() => {
    fetchQueueData()

    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchQueueData(false)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchQueueData = (showLoading = true) => {
    if (showLoading) setLoading(true)
    else setRefreshing(true)

    // In a real app, this would be an API call
    // Simulating data fetch for demo purposes
    setTimeout(() => {
      const mockData: QueueItem[] = [
        {
          id: "1",
          type: "consultation",
          queueNumber: 3,
          status: "current",
          estimatedTime: "Сейчас",
          estimatedMinutes: 0,
        },
        {
          id: "2",
          type: "documents",
          queueNumber: 4,
          status: "waiting",
          estimatedTime: "~10 минут",
          estimatedMinutes: 10,
        },
        {
          id: "3",
          type: "consultation",
          queueNumber: 5,
          status: "waiting",
          estimatedTime: "~20 минут",
          estimatedMinutes: 20,
        },
        {
          id: "4",
          type: "documents",
          queueNumber: 6,
          status: "waiting",
          estimatedTime: "~30 минут",
          estimatedMinutes: 30,
        },
        {
          id: "5",
          type: "consultation",
          queueNumber: 1,
          status: "completed",
          estimatedTime: "Завершено",
          estimatedMinutes: 0,
        },
        {
          id: "6",
          type: "consultation",
          queueNumber: 2,
          status: "completed",
          estimatedTime: "Завершено",
          estimatedMinutes: 0,
        },
      ]

      setQueueItems(mockData)
      setCurrentNumber(3)
      setLastUpdated(new Date())

      // Calculate stats
      const waiting = mockData.filter((item) => item.status === "waiting").length
      const completed = mockData.filter((item) => item.status === "completed").length
      const avgWaitTime = Math.round(
        mockData.filter((item) => item.status === "waiting").reduce((acc, item) => acc + item.estimatedMinutes, 0) /
          (waiting || 1),
      )

      setStats({
        waiting,
        completed,
        avgWaitTime,
      })

      setLoading(false)
      setRefreshing(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "current":
        return <Badge className="bg-green-500 hover:bg-green-600 transition-colors">Текущий</Badge>
      case "waiting":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
          >
            В ожидании
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Завершено
          </Badge>
        )
      default:
        return <Badge variant="outline">Неизвестно</Badge>
    }
  }

  const getProgressValue = (estimatedMinutes: number) => {
    const maxWait = 30
    return 100 - Math.min(100, (estimatedMinutes / maxWait) * 100)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b">
          <div className="container flex h-16 items-center px-4 sm:px-8">
            <MainNav />
          </div>
        </header>
        <main className="flex-1 container py-10">
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="animate-spin">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Загрузка данных очереди...</p>
          </div>
        </main>
        <Footer />
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
          <h1 className="text-3xl font-bold text-primary">Электронная очередь</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchQueueData(false)}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Обновить данные
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card className="md:col-span-2">
            <CardHeader className="bg-primary/5 dark:bg-primary/10">
              <CardTitle className="text-center text-2xl">
                <motion.div
                  key={currentNumber}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center"
                >
                  Текущий номер: <span className="ml-2 text-primary">{currentNumber}</span>
                </motion.div>
              </CardTitle>
              <CardDescription className="text-center">Обновлено: {lastUpdated.toLocaleTimeString()}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />В ожидании
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.waiting}</div>
              <p className="text-sm text-muted-foreground">человек</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Среднее время
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.avgWaitTime}</div>
              <p className="text-sm text-muted-foreground">минут ожидания</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="mb-6">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="current">Текущая очередь</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Текущая очередь</CardTitle>
                <CardDescription>Статус очереди в реальном времени</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>№</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Ожидание</TableHead>
                        <TableHead className="hidden md:table-cell">Прогресс</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {queueItems.filter((item) => item.status !== "completed").length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              Нет активных записей в очереди
                            </TableCell>
                          </TableRow>
                        ) : (
                          queueItems
                            .filter((item) => item.status !== "completed")
                            .map((item) => (
                              <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                <TableCell className="font-medium">
                                  {item.status === "current" ? (
                                    <motion.div
                                      animate={{ scale: [1, 1.1, 1] }}
                                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                                      className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground"
                                    >
                                      {item.queueNumber}
                                    </motion.div>
                                  ) : (
                                    item.queueNumber
                                  )}
                                </TableCell>
                                <TableCell>
                                  {item.type === "consultation" ? "Консультация" : "Подача документов"}
                                </TableCell>
                                <TableCell>{getStatusBadge(item.status)}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="flex items-center gap-2">
                                    <Progress value={getProgressValue(item.estimatedMinutes)} className="h-2" />
                                    <span className="text-sm text-muted-foreground w-16">{item.estimatedTime}</span>
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))
                        )}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>История очереди</CardTitle>
                <CardDescription>Завершенные номера очереди</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>№</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queueItems.filter((item) => item.status === "completed").length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                            Нет завершенных записей
                          </TableCell>
                        </TableRow>
                      ) : (
                        queueItems
                          .filter((item) => item.status === "completed")
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.queueNumber}</TableCell>
                              <TableCell>
                                {item.type === "consultation" ? "Консультация" : "Подача документов"}
                              </TableCell>
                              <TableCell>{getStatusBadge(item.status)}</TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Запись в очередь</CardTitle>
              <CardDescription>Запишитесь на консультацию или подачу документов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 rounded-lg bg-primary/5 dark:bg-primary/10">
                <Calendar className="h-10 w-10 text-primary mr-4" />
                <div>
                  <h3 className="font-medium">Доступно онлайн</h3>
                  <p className="text-sm text-muted-foreground">Запись через личный кабинет доступна 24/7</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg bg-primary/5 dark:bg-primary/10">
                <Bell className="h-10 w-10 text-primary mr-4" />
                <div>
                  <h3 className="font-medium">Уведомления</h3>
                  <p className="text-sm text-muted-foreground">Получайте SMS и email уведомления о статусе очереди</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <Link href="/auth/login">
                  <Button className="w-full">Войти в систему</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" className="w-full">
                    Зарегистрироваться
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>QR-код для киоска</CardTitle>
              <CardDescription>Отсканируйте для быстрого доступа к системе</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCodeSVG
                  value="https://iubip-queue.vercel.app"
                  size={180}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Отсканируйте этот QR-код для быстрого доступа к системе электронной очереди через киоск в университете
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
