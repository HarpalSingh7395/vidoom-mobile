import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function page() {
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>[id] = {id}</Text>
    </View>
  )
}