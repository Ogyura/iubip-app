"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, Check, Clock, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import confetti from "canvas-confetti"

export function QueueForm() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [type, setType] = useState<"consultation" | "documents">("consultation")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Запись создана",
        description: "Вы успешно записались в электронную очередь",
      })

      // Trigger confetti animation on success
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setLoading(false)
      // Reset form
      setType("consultation")
      setDate(undefined)
      setTime("")
      setPhone("")
    }, 1500)
  }

  // Get available time slots
  const getAvailableTimeSlots = () => {
    const timeSlots = []
    const startHour = 9
    const endHour = 17

    for (let hour = startHour; hour < endHour; hour++) {
      timeSlots.push(`${hour}:00`)
      timeSlots.push(`${hour}:30`)
    }

    return timeSlots
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "")
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`
    if (phoneNumberLength < 10)
      return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setPhone(formattedPhone)
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary/5 dark:bg-primary/10 rounded-t-lg">
        <CardTitle>Новая запись в очередь</CardTitle>
        <CardDescription>Заполните форму для записи на консультацию или подачу документов</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label>Тип записи</Label>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as "consultation" | "documents")}
              className="grid grid-cols-2 gap-4"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary cursor-pointer transition-colors",
                  type === "consultation" && "border-primary bg-primary/5 dark:bg-primary/10",
                )}
              >
                <RadioGroupItem value="consultation" id="consultation" className="sr-only" />
                <Clock
                  className={cn("mb-3 h-6 w-6 text-muted-foreground", type === "consultation" && "text-primary")}
                />
                <Label htmlFor="consultation" className="cursor-pointer text-center">
                  Консультация
                </Label>
              </div>
              <div
                className={cn(
                  "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary cursor-pointer transition-colors",
                  type === "documents" && "border-primary bg-primary/5 dark:bg-primary/10",
                )}
              >
                <RadioGroupItem value="documents" id="documents" className="sr-only" />
                <FileText
                  className={cn("mb-3 h-6 w-6 text-muted-foreground", type === "documents" && "text-primary")}
                />
                <Label htmlFor="documents" className="cursor-pointer text-center">
                  Подача документов
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Дата</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ru }) : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={
                    (date) =>
                      date < new Date() || // Can't select past dates
                      date.getDay() === 0 || // Can't select Sunday
                      date.getDay() === 6 || // Can't select Saturday
                      date > new Date(new Date().setDate(new Date().getDate() + 14)) // Can't select more than 14 days ahead
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Время</Label>
            <div className="grid grid-cols-4 gap-2">
              {getAvailableTimeSlots().map((timeSlot) => (
                <Button
                  key={timeSlot}
                  type="button"
                  variant={time === timeSlot ? "default" : "outline"}
                  className={cn("h-10", time === timeSlot && "bg-primary text-primary-foreground")}
                  onClick={() => setTime(timeSlot)}
                >
                  {timeSlot}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">ФИО</Label>
            <Input id="name" value={user?.name || ""} disabled className="bg-muted/50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email || ""} disabled className="bg-muted/50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full relative overflow-hidden group" disabled={loading || !date || !time}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Создание записи...
              </span>
            ) : (
              <>
                <span className="relative z-10 flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Записаться в очередь
                </span>
                <span className="absolute inset-0 h-full w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
