import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from './Button'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';

export const AvatarEdit = ({ props }) => {
  const {
    globalState: { user },
    updateUser
  } = useContext(AuthContext);

  const { firstName, lastName, profileImageUri } = user;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateUser({ profileImageUri: result.assets[0].uri });
    }
  };

  const clearImage = async () => {
    updateUser({ profileImageUri: null });
  };

  return (
    <View>
      <Text style={styles.label}>Avatar</Text>
      <View style={styles.container}>
        {profileImageUri && (
          <Image
            source={{ uri: profileImageUri }}
            style={styles.avatarContainer}
          />
        )}
        {!profileImageUri && (
          <View style={styles.avatarContainer}>
            <Text style={styles.text}>
              {firstName?.slice(0, 1)}
              {lastName?.slice(0, 1)}
            </Text>
          </View>
        )}

        <Button text="Change" onPress={pickImage} />
        {profileImageUri && (
          <Button text="Remove" onPress={clearImage} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 10,
    fontWeight: "bold",
    color: "gray",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatarImage: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  headerAvatar: {
    backgroundColor: '#495E57',
    height: 30,
    width: 30,
    fontSize: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarText: {
    color: '#EDEFEE',
    fontSize: 10,
  },
  avatarContainer: {
    backgroundColor: '#495E57',
    height: 68,
    width: 68,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: '#EDEFEE', fontSize: 30 },
});