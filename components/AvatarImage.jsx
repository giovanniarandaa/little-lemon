import React, { useContext } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';

export const AvatarImage = ({ onPress }) => {
  const {
    globalState: { user },
  } = useContext(AuthContext);

  const { firstName, lastName, profileImageUri } = user;

  return (
    <Pressable onPress={onPress}>
      {profileImageUri && (
        <Image
          source={{ uri: profileImageUri }}
          style={styles.avatarImage}
        />
      )}
      {!profileImageUri && (
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>
            {firstName?.slice(0, 1)}
            {lastName?.slice(0, 1)}
          </Text>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
});
