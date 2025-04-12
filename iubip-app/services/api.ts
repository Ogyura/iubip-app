import axios from "axios"

// В реальном приложении здесь будет URL вашего API
export const api = axios.create({
  baseURL: "https://api.iubip.ru",
  timeout: 10000,
})

// Перехватчик для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибок авторизации
    if (error.response && error.response.status === 401) {
      // Можно добавить логику для обновления токена или выхода из системы
    }
    return Promise.reject(error)
  },
)
