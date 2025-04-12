import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"

// Screens
import HomeScreen from "../screens/HomeScreen"
import AboutScreen from "../screens/AboutScreen"
import ProgramsScreen from "../screens/ProgramsScreen"
import AdmissionScreen from "../screens/AdmissionScreen"
import NewsScreen from "../screens/NewsScreen"
import ContactScreen from "../screens/ContactScreen"
import NewsDetailScreen from "../screens/NewsDetailScreen"
import ProgramDetailScreen from "../screens/ProgramDetailScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import DocumentsScreen from "../screens/profile/DocumentsScreen"
import QueueScreen from "../screens/profile/QueueScreen"
import NotificationsScreen from "../screens/profile/NotificationsScreen"
import SettingsScreen from "../screens/profile/SettingsScreen"

import { COLORS } from "../App"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function NewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Новости" component={NewsScreen} />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={({ route }) => ({ title: route.params?.title || "Новость" })}
      />
    </Stack.Navigator>
  )
}

function ProgramsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Программы" component={ProgramsScreen} />
      <Stack.Screen
        name="ProgramDetail"
        component={ProgramDetailScreen}
        options={({ route }) => ({ title: route.params?.title || "Программа" })}
      />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Профиль" component={ProfileScreen} />
      <Stack.Screen name="Документы" component={DocumentsScreen} />
      <Stack.Screen name="Очередь" component={QueueScreen} />
      <Stack.Screen name="Уведомления" component={NotificationsScreen} />
      <Stack.Screen name="Настройки" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Главная") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "О нас") {
            iconName = focused ? "information-circle" : "information-circle-outline"
          } else if (route.name === "Программы") {
            iconName = focused ? "school" : "school-outline"
          } else if (route.name === "Поступление") {
            iconName = focused ? "document-text" : "document-text-outline"
          } else if (route.name === "Новости") {
            iconName = focused ? "newspaper" : "newspaper-outline"
          } else if (route.name === "Контакты") {
            iconName = focused ? "call" : "call-outline"
          } else if (route.name === "Профиль") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.secondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="О нас" component={AboutScreen} />
      <Tab.Screen name="Программы" component={ProgramsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Поступление" component={AdmissionScreen} />
      <Tab.Screen name="Новости" component={NewsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Контакты" component={ContactScreen} />
      <Tab.Screen name="Профиль" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
