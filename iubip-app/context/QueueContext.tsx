"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useAuth } from "./AuthContext"

interface QueueItem {
  id: string
  type: "consultation" | "documents"
  status: "waiting" | "processing" | "completed" | "cancelled"
  position: number
  estimatedTime: number // в минутах
  createdAt: string
  updatedAt: string
}

interface Notification {
  id: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

interface QueueContextData {
  queueItems: QueueItem[]
  notifications: Notification[]
  loading: boolean
  joinQueue: (type: "consultation" | "documents") => Promise<void>
  cancelQueue: (id: string) => Promise<void>
  markNotificationAsRead: (id: string) => Promise<void>
  refreshQueue: () => Promise<void>
}

const QueueContext = createContext<QueueContextData>({} as QueueContextData)

export const QueueProvider: React.FC = ({ children }) => {
  const { user } = useAuth()
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      refreshQueue()
    }
  }, [user])

  const refreshQueue = async () => {
    if (!user) return

    setLoading(true)
    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await api.get('/queue');

      // Имитация ответа от сервера
      const mockQueueItems: QueueItem[] = [
        {
          id: "1",
          type: "consultation",
          status: "waiting",
          position: 3,
          estimatedTime: 15,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]

      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "Изменение статуса очереди",
          message: "Ваша позиция в очереди изменилась. Текущая позиция: 3",
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Напоминание",
          message: "Не забудьте принести оригиналы документов при посещении приемной комиссии",
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // вчера
        },
      ]

      setQueueItems(mockQueueItems)
      setNotifications(mockNotifications)
    } catch (error) {
      console.error("Ошибка при загрузке данных очереди:", error)
    } finally {
      setLoading(false)
    }
  }

  const joinQueue = async (type: "consultation" | "documents") => {
    if (!user) return

    setLoading(true)
    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await api.post('/queue', { type });

      // Имитация ответа от сервера
      const newQueueItem: QueueItem = {
        id: Date.now().toString(),
        type,
        status: "waiting",
        position: type === "consultation" ? 5 : 8,
        estimatedTime: type === "consultation" ? 25 : 40,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setQueueItems([...queueItems, newQueueItem])

      // Добавляем уведомление о постановке в очередь
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "Постановка в очередь",
        message: `Вы успешно встали в очередь на ${
          type === "consultation" ? "консультацию" : "подачу документов"
        }. Ваша позиция: ${newQueueItem.position}`,
        read: false,
        createdAt: new Date().toISOString(),
      }

      setNotifications([newNotification, ...notifications])
    } catch (error) {
      throw new Error("Ошибка при постановке в очередь")
    } finally {
      setLoading(false)
    }
  }

  const cancelQueue = async (id: string) => {
    if (!user) return

    setLoading(true)
    try {
      // В реальном приложении здесь будет запрос к API
      // await api.delete(`/queue/${id}`);

      // Обновляем локальное состояние
      const updatedQueueItems = queueItems.filter((item) => item.id !== id)
      setQueueItems(updatedQueueItems)

      // Добавляем уведомление об отмене очереди
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "Отмена очереди",
        message: "Вы успешно отменили свою позицию в очереди",
        read: false,
        createdAt: new Date().toISOString(),
      }

      setNotifications([newNotification, ...notifications])
    } catch (error) {
      throw new Error("Ошибка при отмене очереди")
    } finally {
      setLoading(false)
    }
  }

  const markNotificationAsRead = async (id: string) => {
    if (!user) return

    try {
      // В реальном приложении здесь будет запрос к API
      // await api.put(`/notifications/${id}`, { read: true });

      // Обновляем локальное состояние
      const updatedNotifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      )
      setNotifications(updatedNotifications)
    } catch (error) {
      throw new Error("Ошибка при обновлении уведомления")
    }
  }

  return (
    <QueueContext.Provider
      value={{
        queueItems,
        notifications,
        loading,
        joinQueue,
        cancelQueue,
        markNotificationAsRead,
        refreshQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  )
}

export function useQueue() {
  const context = useContext(QueueContext)

  if (!context) {
    throw new Error("useQueue must be used within a QueueProvider")
  }

  return context
}
