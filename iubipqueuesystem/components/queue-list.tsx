"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { AlertCircle, Calendar, Clock, FileText, Trash2, Users } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"

type QueueItem = {
  id: string
  userId: string
  type: "consultation" | "documents"
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  queueNumber: number
  estimatedTime: string
}

export function QueueList() {
  const { user } = useAuth()
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const [itemToCancel, setItemToCancel] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating data fetch for demo purposes
    setTimeout(() => {
      const mockData: QueueItem[] = [
        {
          id: "1",
          userId: "2",
          type: "consultation",
          date: "2025-04-15",
          time: "10:00",
          status: "confirmed",
          queueNumber: 5,
          estimatedTime: "10:15",
        },
        {
          id: "2",
          userId: "2",
          type: "documents",
          date: "2025-04-20",
          time: "14:30",
          status: "pending",
          queueNumber: 12,
          estimatedTime: "14:45",
        },
      ]

      // Filter items for the current user
      const userItems = mockData.filter((item) => item.userId === user?.id)
      setQueueItems(userItems)
      setLoading(false)
    }, 1500)
  }, [user])

  const cancelQueueItem = (id: string) => {
    // In a real app, this would be an API call
    setQueueItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, status: "cancelled" } : item)))
    toast({
      title: "Запись отменена",
      description: "Ваша запись в очереди была успешно отменена",
    })
    setItemToCancel(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
          >
            Ожидает подтверждения
          </Badge>
        )
      case "confirmed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            Подтверждено
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
          >
            Завершено
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          >
            Отменено
          </Badge>
        )
      default:
        return <Badge variant="outline">Неизвестно</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-6 w-28" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (queueItems.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-10 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">У вас пока нет записей в очереди</h3>
          <p className="text-muted-foreground max-w-md">
            Создайте новую запись, чтобы записаться на консультацию или подачу документов
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {queueItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={item.status === "cancelled" ? "opacity-70" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    {item.type === "consultation" ? (
                      <Users className="h-5 w-5 text-primary" />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle>{item.type === "consultation" ? "Консультация" : "Подача документов"}</CardTitle>
                    <CardDescription>
                      {new Date(item.date).toLocaleDateString("ru-RU")}, {item.time}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">Номер в очереди:</span>
                  </div>
                  <span className="font-medium text-lg">{item.queueNumber}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">Ожидаемое время:</span>
                  </div>
                  <span className="font-medium">{item.estimatedTime}</span>
                </div>
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              {item.status !== "cancelled" && item.status !== "completed" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Отменить запись
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Отменить запись?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Вы уверены, что хотите отменить запись? Это действие нельзя будет отменить.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => cancelQueueItem(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Отменить запись
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {item.status === "cancelled" && (
                <div className="flex items-center justify-center p-2 rounded-md bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">Запись была отменена</span>
                </div>
              )}

              {item.status === "completed" && (
                <div className="flex items-center justify-center p-2 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Запись завершена</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
