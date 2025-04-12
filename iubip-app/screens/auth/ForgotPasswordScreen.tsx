"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../App"
import { Ionicons } from "@expo/vector-icons"

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const navigation = useNavigation()
  const { forgotPassword } = useAuth()

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Ошибка", "Пожалуйста, введите email")
      return
    }

    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось отправить инструкции. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Восстановление пароля</Text>
        <Text style={styles.subtitle}>Южно-Российский гуманитарный институт</Text>
      </View>

      <View style={styles.formContainer}>
        {!sent ? (
          <>
            <Text style={styles.instructions}>
              Введите email, указанный при регистрации. Мы отправим вам инструкции по восстановлению пароля.
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.secondary} />
              ) : (
                <Text style={styles.resetButtonText}>Отправить инструкции</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={60} color={COLORS.success} style={styles.successIcon} />
            <Text style={styles.successTitle}>Инструкции отправлены</Text>
            <Text style={styles.successText}>
              Мы отправили инструкции по восстановлению пароля на указанный email. Пожалуйста, проверьте вашу почту.
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backButtonText}>Вернуться к входу</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 10,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  instructions: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondary,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: COLORS.text,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  resetButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.success,
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 20,
  },
})

export default ForgotPasswordScreen
