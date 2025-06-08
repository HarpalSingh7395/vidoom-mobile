import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { useGetCallById } from '~/hooks/useGetCallById';
import { Lobby, StreamCall, StreamTheme } from '@stream-io/video-react-native-sdk';
import { CallScreen } from '~/components/meeting/CallScreen';
import { StreamClientProvider } from '~/providers/StreamClientProvider';

export default function page() {
    const { id } = useLocalSearchParams();
    const { isLoaded } = useUser();
    const [isReady, setIsReady] = useState<boolean>(false);
    const router = useRouter();

    const { call, isLoading: isLoadingCall } = useGetCallById(id);

    const onJoinCall = async () => {
        if (!call) return;
        call.join();
        setIsReady(true);
    }

    const onExit = () => {
        router.back();
    }

    useEffect(() => {
        console.log("Meeting loaded", id)
        return () => {
            if (!call) return;
            call.leave();
        }
    }, [call])


    if (!isLoaded || isLoadingCall || !call) return <View className='flex-1 flex justify-center items-center'><ActivityIndicator /></View>;
    return (
        <StreamClientProvider>
            <StreamCall call={call}>
                <StreamTheme>
                    {isReady ? <CallScreen call={call} goToHomeScreen={onExit} /> : <Lobby onJoinCallHandler={onJoinCall} />}
                </StreamTheme>
            </StreamCall>
        </StreamClientProvider>
    )
}