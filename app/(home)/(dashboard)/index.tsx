import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { View, Text, StatusBar } from 'react-native';
import MeetingTypeList from '~/components/MeetingTypeList';
import ProfileDropdown from '~/components/ProfileDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = [
    {
        title: "Scheduled",
        path: "/scheduled",
    },
    {
        title: "Recordings",
        path: "/recordings",
    },
    {
        title: "Personal Room",
        path: "/personal-room",
    },
]

export default function index() {
    const { user } = useUser();

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="dark-content" />
            <MeetingTypeList className='px-4' />
        </SafeAreaView>
    )
}