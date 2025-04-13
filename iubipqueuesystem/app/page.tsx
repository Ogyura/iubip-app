import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CalendarClock, Bell, Shield, ArrowRight, CheckCircle2, Clock, Smartphone } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Электронная очередь ИУБиП
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Запись на консультацию или подачу документов для абитуриентов и родителей
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login">
                  <Button size="lg" className="group">
                    Войти в систему
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" size="lg">
                    Зарегистрироваться
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                  <CalendarClock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Онлайн запись</h3>
                <p className="text-muted-foreground">
                  Запишитесь на консультацию или подачу документов не выходя из дома
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Уведомления</h3>
                <p className="text-muted-foreground">
                  Получайте уведомления о приближении вашей очереди и изменении статуса
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Безопасность</h3>
                <p className="text-muted-foreground">Ваши данные надежно защищены в нашей системе</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Как это работает</h2>
              <p className="max-w-[700px] text-muted-foreground">Простой процесс записи в электронную очередь</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-lg font-medium">Регистрация</h3>
                <p className="text-sm text-muted-foreground">Создайте аккаунт в системе</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-lg font-medium">Выбор услуги</h3>
                <p className="text-sm text-muted-foreground">Выберите тип консультации или подачи документов</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-lg font-medium">Запись</h3>
                <p className="text-sm text-muted-foreground">Выберите удобную дату и время</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <h3 className="text-lg font-medium">Готово</h3>
                <p className="text-sm text-muted-foreground">Получите уведомление и приходите в назначенное время</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Преимущества системы</h2>
                  <p className="text-muted-foreground">
                    Наша электронная очередь делает процесс записи простым и удобным
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Экономия времени - запись онлайн без необходимости личного визита</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Удобный выбор даты и времени</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Отслеживание статуса очереди в реальном времени</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Уведомления о приближении вашей очереди</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Возможность отмены или переноса записи</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                    <Clock className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-medium">Экономия времени</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      До 70% экономии времени при использовании электронной очереди
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                    <Smartphone className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-medium">Мобильный доступ</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Доступ к системе с любого устройства в любое время
                    </p>
                  </div>
                  <div className="col-span-2 flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                    <div className="text-4xl font-bold text-primary">95%</div>
                    <p className="text-sm text-center text-muted-foreground">пользователей рекомендуют нашу систему</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
