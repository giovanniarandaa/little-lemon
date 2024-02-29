import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import { Navigation } from "./navigation/Navigation";

export default function App() {

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Navigation />
    </ AuthProvider>
  );
}
