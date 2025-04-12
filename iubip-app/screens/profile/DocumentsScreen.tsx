"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator, Modal } from "react-native"
import { COLORS } from "../../App"
import { Ionicons } from "@expo/vector-icons"
import * as DocumentPicker from "expo-document-picker"

interface Document {
  id: string
  name: string
  type: string
  status: "pending" | "approved" | "rejected"
  comment?: string
  uploadDate: string
  size: number
}

const DocumentsScreen = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Паспорт.pdf",
      type: "application/pdf",
      status: "approved",
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      size: 1024 * 1024 * 2.5, // 2.5 MB
    },
    {
      id: "2",
      name: "Аттестат.pdf",
      type: "application/pdf",
      status: "pending",
      uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      size: 1024 * 1024 * 3.2, // 3.2 MB
    },
    {
      id: "3",
      name: "Медицинская справка.pdf",
      type: "application/pdf",
      status: "rejected",
      comment: "Документ не читается. Пожалуйста, загрузите более качественную копию.",
      uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      size: 1024 * 1024 * 1.8, // 1.8 MB
    },
  ])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleUploadDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      })

      if (result.canceled) {
        return
      }

      const asset = result.assets[0]
      setUploading(true)

      // Имитация загрузки файла на сервер
      setTimeout(() => {
        const newDocument: Document = {
          id: Date.now().toString(),
          name: asset.name,
          type: asset.mimeType || "application/octet-stream",
          status: "pending",
          uploadDate: new Date().toISOString(),
          size: asset.size || 0,
        }

        setDocuments([newDocument, ...documents])
        setUploading(false)
        Alert.alert("Успешно", "Документ успешно загружен и отправлен на проверку")
      }, 2000)
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось загрузить документ. Попробуйте позже.")
      setUploading(false)
    }
  }

  const handleDeleteDocument = (id: string) => {
    Alert.alert(
      "Удаление документа",
      "Вы уверены, что хотите удалить этот документ?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            const updatedDocuments = documents.filter((doc) => doc.id !== id)
            setDocuments(updatedDocuments)
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setModalVisible(true)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + " B"
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB"
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB"
    }
  }

  const renderDocumentItem = ({ item }: { item: Document }) => {
    return (
      <TouchableOpacity style={styles.documentItem} onPress={() => handleViewDocument(item)}>
        <View style={styles.documentIcon}>
          <Ionicons
            name={item.type.includes("image") ? "image-outline" : "document-text-outline"}
            size={30}
            color={COLORS.primary}
          />
        </View>
        <View style={styles.documentInfo}>
          <Text style={styles.documentName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.documentDate}>Загружен: {new Date(item.uploadDate).toLocaleDateString()}</Text>
          <Text style={styles.documentSize}>{formatFileSize(item.size)}</Text>
          <View
            style={[
              styles.statusBadge,
              item.status === "pending"
                ? styles.statusPending
                : item.status === "approved"
                  ? styles.statusApproved
                  : styles.statusRejected,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status === "pending" ? "На проверке" : item.status === "approved" ? "Одобрен" : "Отклонен"}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteDocument(item.id)}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мои документы</Text>
        <Text style={styles.headerSubtitle}>Загрузите необходимые документы для поступления</Text>
      </View>

      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDocument} disabled={uploading}>
          {uploading ? (
            <ActivityIndicator color={COLORS.secondary} />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={24} color={COLORS.secondary} style={styles.uploadIcon} />
              <Text style={styles.uploadButtonText}>Загрузить документ</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Загрузка документов...</Text>
        </View>
      ) : (
        <FlatList
          data={documents}
          renderItem={renderDocumentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.documentsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={60} color={COLORS.primary} style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>У вас нет загруженных документов</Text>
              <Text style={styles.emptyText}>Загрузите необходимые документы для поступления в институт</Text>
            </View>
          }
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Информация о документе</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {selectedDocument && (
              <View style={styles.modalBody}>
                <View style={styles.documentIconLarge}>
                  <Ionicons
                    name={selectedDocument.type.includes("image") ? "image-outline" : "document-text-outline"}
                    size={50}
                    color={COLORS.primary}
                  />
                </View>

                <View style={styles.documentDetailItem}>
                  <Text style={styles.documentDetailLabel}>Название:</Text>
                  <Text style={styles.documentDetailValue}>{selectedDocument.name}</Text>
                </View>

                <View style={styles.documentDetailItem}>
                  <Text style={styles.documentDetailLabel}>Тип файла:</Text>
                  <Text style={styles.documentDetailValue}>{selectedDocument.type}</Text>
                </View>

                <View style={styles.documentDetailItem}>
                  <Text style={styles.documentDetailLabel}>Размер:</Text>
                  <Text style={styles.documentDetailValue}>{formatFileSize(selectedDocument.size)}</Text>
                </View>

                <View style={styles.documentDetailItem}>
                  <Text style={styles.documentDetailLabel}>Дата загрузки:</Text>
                  <Text style={styles.documentDetailValue}>
                    {new Date(selectedDocument.uploadDate).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.documentDetailItem}>
                  <Text style={styles.documentDetailLabel}>Статус:</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      selectedDocument.status === "pending"
                        ? styles.statusPending
                        : selectedDocument.status === "approved"
                          ? styles.statusApproved
                          : styles.statusRejected,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {selectedDocument.status === "pending"
                        ? "На проверке"
                        : selectedDocument.status === "approved"
                          ? "Одобрен"
                          : "Отклонен"}
                    </Text>
                  </View>
                </View>

                {selectedDocument.comment && (
                  <View style={styles.documentDetailItem}>
                    <Text style={styles.documentDetailLabel}>Комментарий:</Text>
                    <Text style={styles.documentDetailValue}>{selectedDocument.comment}</Text>
                  </View>
                )}

                <TouchableOpacity style={styles.viewDocumentButton}>
                  <Text style={styles.viewDocumentButtonText}>Просмотреть документ</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  uploadContainer: {
    padding: 15,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: {
    marginRight: 10,
  },
  uploadButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
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
  documentsList: {
    padding: 15,
  },
  documentItem: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  documentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  documentDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  documentSize: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusPending: {
    backgroundColor: COLORS.warning + "30",
  },
  statusApproved: {
    backgroundColor: COLORS.success + "30",
  },
  statusRejected: {
    backgroundColor: COLORS.error + "30",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 10,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  modalBody: {
    alignItems: "center",
  },
  documentIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  documentDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  documentDetailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
    width: "30%",
  },
  documentDetailValue: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  viewDocumentButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  viewDocumentButtonText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default DocumentsScreen
