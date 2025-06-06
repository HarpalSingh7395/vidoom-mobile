import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import MeetingTypeList from '~/components/MeetingTypeList';
import ProfileDropdown from '~/components/ProfileDropdown';

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
            <View className="px-4 pt-2 pb-2 flex-row items-center">
                <View className="flex-1">
                    <Text className="text-foreground">{user?.firstName}</Text>
                    <Text className="text-3xl font-bold text-foreground">Dashboard</Text>
                </View>
                <ProfileDropdown />
            </View>
            <MeetingTypeList />
        </SafeAreaView>
    )
}