"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function AdminKioskSettings() {
  const { toast } = useToast()
  const [kioskEnabled, setKioskEnabled] = useState(true)
  const [kioskIp, setKioskIp] = useState("192.168.1.100")
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Настройки сохранены",
        description: "Настройки киоска были успешно сохранены",
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки киоска</CardTitle>
        <CardDescription>Настройте параметры интеграции с киоском для синхронизации данных</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="kiosk-enabled">Включить киоск</Label>
              <p className="text-sm text-gray-500">Включение/отключение интеграции с киоском</p>
            </div>
            <Switch id="kiosk-enabled" checked={kioskEnabled} onCheckedChange={setKioskEnabled} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kiosk-ip">IP-адрес киоска</Label>
            <Input
              id="kiosk-ip"
              value={kioskIp}
              onChange={(e) => setKioskIp(e.target.value)}
              disabled={!kioskEnabled}
            />
            <p className="text-sm text-gray-500">Укажите IP-адрес киоска для подключения</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refresh-interval">Интервал обновления (секунды)</Label>
            <Input
              id="refresh-interval"
              type="number"
              min="5"
              max="300"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              disabled={!kioskEnabled}
            />
            <p className="text-sm text-gray-500">Частота обновления данных между киоском и сервером</p>
          </div>

          <div className="space-y-2">
            <Label>Статус подключения</Label>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${kioskEnabled ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-sm">{kioskEnabled ? "Подключено" : "Отключено"}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Тестирование подключения</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={!kioskEnabled}
              onClick={() => {
                toast({
                  title: "Тест подключения",
                  description: "Подключение к киоску успешно установлено",
                })
              }}
            >
              Проверить подключение
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" disabled={loading}>
            {loading ? "Сохранение..." : "Сохранить настройки"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
