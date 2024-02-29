import { useContext, useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Constants from "expo-constants";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isValidPhoneNumber } from "../utils/validation";
import { AuthContext } from "../context/AuthContext";

const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  orderStatuses: false,
  passwordChanges: false,
  specialOffers: false,
  newsletter: false,
  image: "",
}

export const Profile = ({ navigation }) => {
  const { updateUser } = useContext(AuthContext);
  const [initProfile, setInitProfile] = useState(DEFAULT_VALUES);
  const [profile, setProfile] = useState(DEFAULT_VALUES);

  const updateProfile = (key, value) => {
    setProfile((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const loadProfileData = async () => {
    try {
      const jsonString = await AsyncStorage.getItem('user');
      if (!jsonString) return;
      const jsonParse = JSON.parse(jsonString)
      await setProfile(prevProfile => ({...prevProfile,...jsonParse }));
      await setInitProfile(prevProfile => ({...prevProfile,...jsonParse }));
    } catch (error) {
      console.log('Error loading profile data:', error);
      return;
    }
  };

  const handleDiscardChanges = () => {
    setProfile(initProfile);
  }

  const saveProfileChanges = async () => {
    if (!isValidPhoneNumber(profile.phoneNumber)) {
      alert('Invalid phone number');
      return;
    }
    try {
      updateUser(profile);
      navigateToWelcomeScreen();
    } catch (error) {
      alert('Error saving profile changes');
      console.error(error);
    }
  };

  const navigateToWelcomeScreen = () => navigation.navigate('Home');

  useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../img/littleLemonLogo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <ScrollView style={styles.viewScroll}>
        <Text style={styles.headertext}>Personal information</Text>
        <Text style={styles.text}>Avatar</Text>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.firstName}
          onChangeText={(newValue) => updateProfile("firstName", newValue)}
          placeholder={"First Name"}
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.lastName}
          onChangeText={(newValue) => updateProfile("lastName", newValue)}
          placeholder={"Last Name"}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.email}
          keyboardType="email-address"
          onChangeText={(newValue) => updateProfile("email", newValue)}
          placeholder={"Email"}
        />
        <Text
          style={ styles.text}
        >
          Phone number (10 digit)
        </Text>
        <TextInput
          style={styles.inputBox}
          value={profile.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={newValue => updateProfile("phoneNumber", newValue)}
          placeholder={"Phone number"}
        />
        <Text style={styles.headertext}>Email notifications</Text>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.orderStatuses}
            onValueChange={newValue => updateProfile("orderStatuses", newValue)}
            color={"#495e57"}
            
          />
          <Text style={styles.paragraph}>Order statuses</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.passwordChanges}
            onValueChange={newValue =>
              updateProfile("passwordChanges", newValue)
            }
            color={"#495e57"}
          />
          <Text style={styles.paragraph}>Password changes</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.specialOffers}
            onValueChange={newValue => updateProfile("specialOffers", newValue)}
            color={"#495e57"}
          />
          <Text style={styles.paragraph}>Special offers</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.newsletter}
            onValueChange={newValue => updateProfile("newsletter", newValue)}
            color={"#495e57"}
          />
          <Text style={styles.paragraph}>Newsletter</Text>
        </View>
        <View style={styles.buttons}>
          <Pressable
            style={styles.saveBtn}
            onPress={saveProfileChanges}
          >
            <Text style={styles.saveBtnText}>Save changes</Text>
          </Pressable>
          <Pressable style={styles.discardBtn} onPress={handleDiscardChanges}>
            <Text style={styles.discardBtnText}>Discard changes</Text>
          </Pressable>
        </View>
        <Pressable style={styles.btn} onPress={() => logout()}>
          <Text style={styles.btntext}>Log out</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  viewScroll: {
    flex: 1,
    padding: 10,
  },
  headertext: {
    fontSize: 22,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputBox: {
    alignSelf: "stretch",
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 9,
    borderColor: "#dfdfe5",
  },
  checkbox: {
    margin: 8,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginVertical: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cc9a22",
  },
  btnDisabled: {
    backgroundColor: "#98b3aa",
  },
  btntext: {
    fontSize: 22,
    color: "#3e524b",
    alignSelf: "center",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#495e57",
    borderRadius: 9,
    alignSelf: "stretch",
    padding: 10,
    borderWidth: 1,
    borderColor: "#3f554d",
    marginBottom: 20
  },
  saveBtnText: {
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  discardBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#83918c",
    marginBottom: 18
  },
  discardBtnText: {
    fontSize: 18,
    color: "#3e524b",
    alignSelf: "center",
  },
});
