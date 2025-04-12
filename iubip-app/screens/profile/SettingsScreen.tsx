"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../App"
import { Ionicons } from "@expo/vector-icons"

const SettingsScreen = () => {
  const { user, updateProfile, signOut } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSaveProfile = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все обязательные поля")
      return
    }

    setLoading(true)
    try {
      await updateProfile({ name, email, phone })
      Alert.alert("Успешно", "Профиль успешно обновлен")
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось обновить профиль. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = () => {
    Alert.alert(
      "Изменение пароля",
      "Вы уверены, что хотите изменить пароль? На ваш email будет отправлена ссылка для сброса пароля.",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Да, изменить",
          onPress: () => {
            Alert.alert("Успешно", "На ваш email отправлена ссылка для изменения пароля")
          },
        },
      ],
      { cancelable: true },
    )
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Удаление аккаунта",
      "Вы уверены, что хотите удалить свой аккаунт? Это действие невозможно отменить.",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить аккаунт",
          onPress: async () => {
            await signOut()
            // В реальном приложении здесь будет запрос к API для удаления аккаунта
            Alert.alert("Успешно", "Ваш аккаунт был удален")
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Настройки профиля</Text>
        <Text style={styles.headerSubtitle}>Управление личными данными и настройками приложения</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Личные данные</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ФИО</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Введите ФИО" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Введите email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Телефон</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Введите телефон"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.secondary} />
          ) : (
            <Text style={styles.saveButtonText}>Сохранить изменения</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Безопасность</Text>

        <TouchableOpacity style={styles.securityButton} onPress={handleChangePassword}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.securityIcon} />
          <Text style={styles.securityButtonText}>Изменить пароль</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Уведомления</Text>

        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>Push-уведомления</Text>
            <Text style={styles.notificationDescription}>Получать уведомления о статусе очереди и документов</Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: "#d1d1d1", true: COLORS.primary + "80" }}
            thumbColor={pushNotifications ? COLORS.primary : "#f4f3f4"}
          />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>Email-уведомления</Text>
            <Text style={styles.notificationDescription}>Получать уведомления на email о важных событиях</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: "#d1d1d1", true: COLORS.primary + "80" }}
            thumbColor={emailNotifications ? COLORS.primary : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Аккаунт</Text>

        <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} style={styles.securityIcon} />
          <Text style={styles.deleteAccountButtonText}>Удалить аккаунт</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Версия приложения: 1.0.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    opacity: 0.9,
  },
  section: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    margin: 15,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  securityButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  securityIcon: {
    marginRight: 15,
  },
  securityButtonText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  notificationTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 12,
    color: "#999",
  },
  deleteAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  deleteAccountButtonText: {
    fontSize: 16,
    color: COLORS.error,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
})

export default SettingsScreen
