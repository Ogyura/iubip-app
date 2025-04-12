"use client"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../App"
import { Ionicons } from "@expo/vector-icons"

const ProfileScreen = () => {
  const { user, signOut } = useAuth()
  const navigation = useNavigation()

  const handleSignOut = () => {
    Alert.alert(
      "Выход из аккаунта",
      "Вы уверены, что хотите выйти?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Выйти",
          onPress: async () => {
            await signOut()
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          },
        },
      ],
      { cancelable: true },
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{user?.name?.charAt(0) || "A"}</Text>
              </View>
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "Пользователь"}</Text>
            <Text style={styles.userRole}>
              {user?.role === "applicant" ? "Абитуриент" : user?.role === "parent" ? "Родитель" : "Пользователь"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Личный кабинет</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Документы")}>
          <Ionicons name="document-text-outline" size={24} color={COLORS.primary} style={styles.menuIcon} />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>Мои документы</Text>
            <Text style={styles.menuDescription}>Загруженные документы и статус проверки</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Очередь")}>
          <Ionicons name="time-outline" size={24} color={COLORS.primary} style={styles.menuIcon} />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>Электронная очередь</Text>
            <Text style={styles.menuDescription}>Запись на консультацию или подачу документов</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Уведомления")}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.primary} style={styles.menuIcon} />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>Уведомления</Text>
            <Text style={styles.menuDescription}>Важные сообщения и обновления</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Настройки</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Настройки")}>
          <Ionicons name="settings-outline" size={24} color={COLORS.primary} style={styles.menuIcon} />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>Настройки профиля</Text>
            <Text style={styles.menuDescription}>Личные данные и настройки приложения</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.error} style={styles.menuIcon} />
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuText, { color: COLORS.error }]}>Выйти из аккаунта</Text>
          </View>
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
    padding: 20,
    paddingBottom: 30,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 5,
  },
  userRole: {
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: "#999",
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

export default ProfileScreen
