import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CallCard from '~/components/CallCard'
import CallList from '~/components/CallList'

const dummyRecordings = [
  {
    id: 1,
    title: 'Client Kickoff Call',
    type: 'completed',
    date: '01 June, 2025',
  },
  {
    id: 2,
    title: 'Design Review Meeting',
    type: 'completed',
    date: '05 June, 2025',
  },
  {
    id: 3,
    title: 'Sprint Planning',
    type: 'upcoming',
    date: '10 June, 2025',
  },
  {
    id: 4,
    title: 'QA Sync',
    type: 'upcoming',
    date: '15 June, 2025',
  },
]

export default function Previous() {
  return (
    <ScrollView>
      <View className='p-4 flex flex-col gap-4'>
        <CallList 
        type='ended'
        />
      </View>
    </ScrollView>
  )
}
