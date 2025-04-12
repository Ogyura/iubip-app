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

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"applicant" | "parent">("applicant")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const { signUp } = useAuth()

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Ошибка", "Пароли не совпадают")
      return
    }

    setLoading(true)
    try {
      await signUp(name, email, phone, password, role)
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      })
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось зарегистрироваться. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Регистрация</Text>
        <Text style={styles.subtitle}>Южно-Российский гуманитарный институт</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="ФИО" value={name} onChangeText={setName} />
        </View>

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

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Телефон"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Подтвердите пароль"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>Я регистрируюсь как:</Text>
          <View style={styles.roleButtons}>
            <TouchableOpacity
              style={[styles.roleButton, role === "applicant" && styles.roleButtonActive]}
              onPress={() => setRole("applicant")}
            >
              <Text style={[styles.roleButtonText, role === "applicant" && styles.roleButtonTextActive]}>
                Абитуриент
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === "parent" && styles.roleButtonActive]}
              onPress={() => setRole("parent")}
            >
              <Text style={[styles.roleButtonText, role === "parent" && styles.roleButtonTextActive]}>Родитель</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.secondary} />
          ) : (
            <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Войти</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
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
  eyeIcon: {
    padding: 10,
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  roleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roleButton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  roleButtonText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  roleButtonTextActive: {
    color: COLORS.secondary,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: COLORS.text,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default RegisterScreen
