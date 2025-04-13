"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

type QueueItem = {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  type: "consultation" | "documents"
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  queueNumber: number
  estimatedTime: string
}

export function AdminQueueList() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating data fetch for demo purposes
    const mockData: QueueItem[] = [
      {
        id: "1",
        userId: "2",
        userName: "Иванов Иван",
        userEmail: "user@iubip.ru",
        userPhone: "+7 (900) 123-45-67",
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
        userName: "Иванов Иван",
        userEmail: "user@iubip.ru",
        userPhone: "+7 (900) 123-45-67",
        type: "documents",
        date: "2025-04-20",
        time: "14:30",
        status: "pending",
        queueNumber: 12,
        estimatedTime: "14:45",
      },
      {
        id: "3",
        userId: "3",
        userName: "Петров Петр",
        userEmail: "petrov@example.com",
        userPhone: "+7 (900) 987-65-43",
        type: "consultation",
        date: "2025-04-16",
        time: "11:30",
        status: "pending",
        queueNumber: 8,
        estimatedTime: "11:45",
      },
      {
        id: "4",
        userId: "4",
        userName: "Сидорова Анна",
        userEmail: "sidorova@example.com",
        userPhone: "+7 (900) 555-55-55",
        type: "documents",
        date: "2025-04-15",
        time: "15:00",
        status: "completed",
        queueNumber: 3,
        estimatedTime: "15:15",
      },
    ]

    setQueueItems(mockData)
    setLoading(false)
  }, [])

  const updateStatus = (id: string, status: string) => {
    // In a real app, this would be an API call
    setQueueItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, status: status as any } : item)))
    toast({
      title: "Статус обновлен",
      description: "Статус записи был успешно обновлен",
    })
  }

  const filteredItems = filter === "all" ? queueItems : queueItems.filter((item) => item.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Ожидает подтверждения
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Подтверждено
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Завершено
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Отменено
          </Badge>
        )
      default:
        return <Badge variant="outline">Неизвестно</Badge>
    }
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Управление очередью</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Фильтр:</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Все записи" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все записи</SelectItem>
                <SelectItem value="pending">Ожидает подтверждения</SelectItem>
                <SelectItem value="confirmed">Подтверждено</SelectItem>
                <SelectItem value="completed">Завершено</SelectItem>
                <SelectItem value="cancelled">Отменено</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>№</TableHead>
                <TableHead>ФИО</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Дата и время</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    Нет записей
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.queueNumber}</TableCell>
                    <TableCell>
                      <div className="font-medium">{item.userName}</div>
                      <div className="text-sm text-gray-500">{item.userEmail}</div>
                    </TableCell>
                    <TableCell>{item.type === "consultation" ? "Консультация" : "Подача документов"}</TableCell>
                    <TableCell>
                      <div>{new Date(item.date).toLocaleDateString("ru-RU")}</div>
                      <div className="text-sm text-gray-500">{item.time}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {item.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 text-green-600 hover:bg-green-50"
                            onClick={() => updateStatus(item.id, "confirmed")}
                          >
                            Подтвердить
                          </Button>
                        )}
                        {(item.status === "pending" || item.status === "confirmed") && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => updateStatus(item.id, "completed")}
                          >
                            Завершить
                          </Button>
                        )}
                        {item.status !== "cancelled" && item.status !== "completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => updateStatus(item.id, "cancelled")}
                          >
                            Отменить
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
