import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { useQueue } from "../../context/QueueContext"
import { COLORS } from "../../App"
import { Ionicons } from "@expo/vector-icons"

const NotificationsScreen = () => {
  const { notifications, loading, markNotificationAsRead, refreshQueue } = useQueue()

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id)
    } catch (error) {
      console.error("Ошибка при обновлении уведомления:", error)
    }
  }

  const renderNotificationItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.notificationItem, !item.read && styles.notificationUnread]}
        onPress={() => handleMarkAsRead(item.id)}
      >
        <View style={styles.notificationIcon}>
          <Ionicons
            name={
              item.title.includes("очеред")
                ? "time-outline"
                : item.title.includes("документ")
                  ? "document-text-outline"
                  : "notifications-outline"
            }
            size={24}
            color={COLORS.primary}
          />
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationDate}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
        {!item.read && <View style={styles.unreadIndicator} />}
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Уведомления</Text>
        <Text style={styles.headerSubtitle}>Важные сообщения и обновления о вашей заявке</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        refreshing={loading}
        onRefresh={refreshQueue}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={60} color={COLORS.primary} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>У вас нет уведомлений</Text>
            <Text style={styles.emptyText}>Здесь будут отображаться важные сообщения и обновления о вашей заявке</Text>
          </View>
        }
      />
    </View>
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
  notificationsList: {
    padding: 15,
  },
  notificationItem: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notificationUnread: {
    backgroundColor: COLORS.lightBlue,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 12,
    color: "#666",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: "center",
  },
})

export default NotificationsScreen
