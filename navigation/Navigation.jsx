import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { SplashScreen } from "../screens/SplashScreen";
import { Onboarding } from "../screens/Onboarding";
import { Profile } from "../screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HomeScreen } from "../screens/HomeScreen";
import { checkMenuTableAndPopulateData, selectAllMenu } from "../database";
import { AvatarImage } from "../components/AvatarImage";
const Stack = createNativeStackNavigator();
export const Navigation = () => {
  const { globalState, setOnboardingCompleted, updateUser } =
    useContext(AuthContext);
  const { isOnboardingCompleted } = globalState;
  const [isLoading, setIsLoading] = useState(true);

  const loadApp = async () => {
    console.log("In loading app");
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setOnboardingCompleted(true);
      }
      updateUser(JSON.parse(user));
      const existingMenuItems = await selectAllMenu();
      if (user && existingMenuItems.length) {
        setIsLoading(false);
        return;
      }
      console.log("Checking For items");
      await checkMenuTableAndPopulateData();
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApp();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isOnboardingCompleted ? (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                headerRight: () =>
                  (
                    <AvatarImage
                      onPress={() => navigation.navigate("Profile")}
                    />
                  ),
              })}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
