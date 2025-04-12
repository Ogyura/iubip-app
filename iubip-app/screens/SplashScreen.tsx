"use client"

import { useEffect } from "react"
import { View, Image, StyleSheet, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../context/AuthContext"
import { COLORS } from "../App"

const SplashScreen = () => {
  const { user, loading } = useAuth()
  const navigation = useNavigation()

  useEffect(() => {
    if (!loading) {
      // Если пользователь авторизован, перенаправляем на главный экран
      // Иначе на экран входа
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: user ? "Main" : "Login" }],
        })
      }, 2000) // Задержка для отображения сплеш-экрана
    }
  }, [loading, user, navigation])

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  logo: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 20,
  },
})

export default SplashScreen
