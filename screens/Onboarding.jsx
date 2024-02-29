import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Onboarding = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setOnboardingCompleted } = useContext(AuthContext);

  useEffect(() => {
    const nameValid = firstName?.length > 3;
    const emailValid = email?.length > 6 && email?.includes("@");
    if (nameValid && emailValid) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [email, firstName]);

  const user = { firstName, email };

  const onNextPress = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setOnboardingCompleted(true);
    } catch (error) {
      console.error('ERROR', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../img/littleLemonLogo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Lets us get to know you</Text>
        </View>
        <View>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
      </View>
      <View style={[styles.footer, isButtonDisabled ? "" : styles.buttonDisabled]}>
        <Pressable style={styles.button} disabled={isButtonDisabled} onPress={onNextPress}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    textAlign: "center",
    color: "#495E57",
    marginBottom: 10,
  },
  input: {
    borderColor: "#495E57",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#DFE3E8",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    backgroundColor: "#CCD2D8",
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    padding: 40,
    textAlign: "center",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  footer: {
    backgroundColor: "#F2F4F7",
    padding: 20,
    paddingTop: 40,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    width: "fit-content",
  },
  button: {
    backgroundColor: "#CCD2D8",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 40,
    margin: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#495E57",
  },
});
