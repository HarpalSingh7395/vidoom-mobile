import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { useGetCallById } from '~/hooks/useGetCallById';
import { StreamCall, StreamTheme } from '@stream-io/video-react-native-sdk';
import { CallScreen } from '~/components/meeting/CallScreen';
import { HomeScreen } from '~/components/meeting/HomeScreen';

export default function page() {
    const { id } = useLocalSearchParams();
    const { isLoaded } = useUser();
    const [isReady, setIsReady] = useState<boolean>(false);

    const { call, isLoading: isLoadingCall } = useGetCallById(id);

    const onJoinCall = async () => {
        if (!call) return;
        call.join();
        setIsReady(true);
    }

    useEffect(() => {
        return () => {
            if (!call) return;
            call.leave();
        }
    }, [call])
    

    if (!isLoaded || isLoadingCall || !call) return <View className='flex-1 flex justify-center items-center'><ActivityIndicator /></View>;
    return (
        <StreamCall call={call}>
            <StreamTheme>
                {isReady? <CallScreen call={call} goToHomeScreen={() => setIsReady(false)} /> : <HomeScreen goToCallScreen={onJoinCall} />}
                </StreamTheme>
        </StreamCall>
    )
}