import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import { AuthProvider } from "./context/AuthContext"
import { QueueProvider } from "./context/QueueContext"

// Screens
import LoginScreen from "./screens/auth/LoginScreen"
import RegisterScreen from "./screens/auth/RegisterScreen"
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen"
import MainTabNavigator from "./navigation/MainTabNavigator"
import SplashScreen from "./screens/SplashScreen"

const Stack = createStackNavigator()

// Colors
export const COLORS = {
  primary: "#0056a4", // Основной синий цвет ЮРГИ
  secondary: "#ffffff", // Белый цвет
  background: "#f8f9fa",
  text: "#333333",
  lightBlue: "#e6f0fa",
  error: "#dc3545",
  success: "#28a745",
  warning: "#ffc107",
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <AuthProvider>
        <QueueProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="Main" component={MainTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueueProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
