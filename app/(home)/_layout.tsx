import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StreamClientProvider } from '~/providers/StreamClientProvider'

export default function _layout() {
  return (
    <StreamClientProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </StreamClientProvider>
  )
}