import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

export const Button = ({ style, textStyle, text, ...args }) => {
  return (
    <Pressable
      style={{
        ...styles.button,
        ...style,
      }}
      {...args}
    >
      <Text
        style={{
          ...styles.textStyle,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#495E57',
    borderColor: '#495E57',
    borderWidth: 2,
  },
  textStyle: {
    color: '#EDEFEE',
    justifyContent: "center",
    fontWeight: "bold",
  },
})