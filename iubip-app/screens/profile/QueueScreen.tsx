"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native"
import { useQueue } from "../../context/QueueContext"
import { COLORS } from "../../App"
import { Ionicons } from "@expo/vector-icons"

const QueueScreen = () => {
  const { queueItems, loading, joinQueue, cancelQueue, refreshQueue } = useQueue()
  const [joiningQueue, setJoiningQueue] = useState(false)

  const handleJoinQueue = async (type: "consultation" | "documents") => {
    setJoiningQueue(true)
    try {
      await joinQueue(type)
      Alert.alert("Успешно", "Вы успешно встали в очередь")
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось встать в очередь. Попробуйте позже.")
    } finally {
      setJoiningQueue(false)
    }
  }

  const handleCancelQueue = async (id: string) => {
    Alert.alert(
      "Отмена очереди",
      "Вы уверены, что хотите отменить свою позицию в очереди?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Да, отменить",
          onPress: async () => {
            try {
              await cancelQueue(id)
              Alert.alert("Успешно", "Вы успешно отменили свою позицию в очереди")
            } catch (error) {
              Alert.alert("Ошибка", "Не удалось отменить очередь. Попробуйте позже.")
            }
          },
        },
      ],
      { cancelable: true },
    )
  }

  const renderQueueItem = ({ item }) => {
    return (
      <View style={styles.queueItem}>
        <View style={styles.queueHeader}>
          <Text style={styles.queueType}>{item.type === "consultation" ? "Консультация" : "Подача документов"}</Text>
          <View
            style={[
              styles.statusBadge,
              item.status === "waiting"
                ? styles.statusWaiting
                : item.status === "processing"
                  ? styles.statusProcessing
                  : item.status === "completed"
                    ? styles.statusCompleted
                    : styles.statusCancelled,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status === "waiting"
                ? "В ожидании"
                : item.status === "processing"
                  ? "В процессе"
                  : item.status === "completed"
                    ? "Завершено"
                    : "Отменено"}
            </Text>
          </View>
        </View>

        <View style={styles.queueInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Позиция в очереди:</Text>
            <Text style={styles.infoValue}>{item.position}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Примерное время ожидания:</Text>
            <Text style={styles.infoValue}>{item.estimatedTime} мин.</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Дата постановки в очередь:</Text>
            <Text style={styles.infoValue}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        </View>

        {item.status === "waiting" && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelQueue(item.id)}>
            <Text style={styles.cancelButtonText}>Отменить</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Электронная очередь</Text>
        <Text style={styles.headerSubtitle}>Запись на консультацию или подачу документов в приемную комиссию</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Загрузка данных...</Text>
        </View>
      ) : (
        <>
          {queueItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="time-outline" size={60} color={COLORS.primary} style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>У вас нет активных записей в очереди</Text>
              <Text style={styles.emptyText}>
                Выберите тип услуги и запишитесь в электронную очередь для посещения приемной комиссии
              </Text>
            </View>
          ) : (
            <FlatList
              data={queueItems}
              renderItem={renderQueueItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.queueList}
              refreshing={loading}
              onRefresh={refreshQueue}
            />
          )}

          <View style={styles.joinQueueContainer}>
            <Text style={styles.joinQueueTitle}>Записаться в очередь</Text>
            <View style={styles.joinQueueButtons}>
              <TouchableOpacity
                style={styles.joinQueueButton}
                onPress={() => handleJoinQueue("consultation")}
                disabled={joiningQueue}
              >
                {joiningQueue ? (
                  <ActivityIndicator size="small" color={COLORS.secondary} />
                ) : (
                  <>
                    <Ionicons
                      name="chatbubbles-outline"
                      size={24}
                      color={COLORS.secondary}
                      style={styles.joinQueueIcon}
                    />
                    <Text style={styles.joinQueueButtonText}>Консультация</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.joinQueueButton}
                onPress={() => handleJoinQueue("documents")}
                disabled={joiningQueue}
              >
                {joiningQueue ? (
                  <ActivityIndicator size="small" color={COLORS.secondary} />
                ) : (
                  <>
                    <Ionicons
                      name="document-text-outline"
                      size={24}
                      color={COLORS.secondary}
                      style={styles.joinQueueIcon}
                    />
                    <Text style={styles.joinQueueButtonText}>Подача документов</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    marginBottom: 20,
  },
  queueList: {
    padding: 15,
  },
  queueItem: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  queueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  queueType: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusWaiting: {
    backgroundColor: COLORS.warning + "30",
  },
  statusProcessing: {
    backgroundColor: COLORS.primary + "30",
  },
  statusCompleted: {
    backgroundColor: COLORS.success + "30",
  },
  statusCancelled: {
    backgroundColor: COLORS.error + "30",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  queueInfo: {
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    width: "60%",
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    width: "40%",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.error,
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
  joinQueueContainer: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  joinQueueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  joinQueueButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  joinQueueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  joinQueueIcon: {
    marginRight: 8,
  },
  joinQueueButtonText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default QueueScreen
