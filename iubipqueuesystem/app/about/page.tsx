import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">О системе</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Электронная очередь ИУБиП</CardTitle>
              <CardDescription>Информация о системе электронной очереди</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Система электронной очереди Южного Университета (ИУБиП) предназначена для организации процесса записи
                абитуриентов и родителей на консультации или подачу документов.
              </p>
              <p>Основные возможности системы:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Онлайн запись на консультацию или подачу документов</li>
                <li>Отслеживание статуса очереди в реальном времени</li>
                <li>Получение уведомлений о приближении вашей очереди</li>
                <li>Интеграция с киоском в университете для синхронизации данных</li>
                <li>Личный кабинет для управления записями</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Как пользоваться системой</CardTitle>
              <CardDescription>Инструкция по использованию электронной очереди</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Для абитуриентов и родителей:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Зарегистрируйтесь в системе или войдите в существующий аккаунт</li>
                <li>Перейдите в раздел "Личный кабинет" и выберите "Новая запись"</li>
                <li>Выберите тип записи (консультация или подача документов)</li>
                <li>Выберите удобную дату и время</li>
                <li>Заполните необходимые данные и подтвердите запись</li>
                <li>Получите уведомление о подтверждении записи</li>
                <li>В день записи следите за статусом очереди в разделе "Электронная очередь"</li>
              </ol>

              <h3 className="text-lg font-medium mt-4">Для сотрудников университета:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Войдите в систему с правами администратора</li>
                <li>Перейдите в "Панель администратора"</li>
                <li>Управляйте записями в очереди, подтверждайте или отменяйте записи</li>
                <li>Настраивайте интеграцию с киоском и параметры уведомлений</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>Как связаться с нами при возникновении вопросов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Если у вас возникли вопросы по работе системы электронной очереди, вы можете связаться с нами следующими
                способами:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Телефон:</strong> +7 (863) 292-43-86
                </p>
                <p>
                  <strong>Email:</strong> info@iubip.ru
                </p>
                <p>
                  <strong>Адрес:</strong> г. Ростов-на-Дону, пр. Михаила Нагибина, 33А/47
                </p>
              </div>
              <p className="mt-4">Режим работы приемной комиссии:</p>
              <p>Понедельник - Пятница: 9:00 - 17:00</p>
              <p>Суббота, Воскресенье: выходной</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
