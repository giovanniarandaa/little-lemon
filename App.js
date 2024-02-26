import { StyleSheet } from "react-native";
import { Onboarding } from "./screens/Onboarding";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "./screens/SplashScreen";
import { useEffect, useState } from "react";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { Profile } from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const handleOnboardingNextPress = async () => {
    try {
      await AsyncStorage.setItem("profile", "token");
      setIsOnboardingCompleted(true);
    } catch (error) {
      console.error("Error setting profile");
    }
  };

  const checkProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem("profile");
      if (profile.length > 1) {
        setIsOnboardingCompleted(true);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkProfile();
    // When app opens run this code
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          {!isOnboardingCompleted ? (
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
              initialParams={{ handleOnboardingNextPress }}
            />
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
