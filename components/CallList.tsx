'use client'
import { useGetCalls } from '~/hooks/useGetCalls'
import React, { useEffect, useState } from 'react'
import { Loader2 } from '~/lib/icons/Loader';
import { Call } from '@stream-io/video-react-native-sdk';
import CallCard from './CallCard';
import { View } from 'react-native';
import { Text } from "~/components/ui/text"


type CallListProps = {
    type: 'ended' | 'upcoming' | 'recordings'
}

type CallRecording = any;

export default function CallList({ type }: CallListProps) {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls

            case 'upcoming':
                return upcomingCalls

            case 'recordings':
                return recordings
            default:
                return [];
        }
    }

    const getNoCallMessage = () => {
        switch (type) {
            case 'ended':
                return 'No previous calls';
            case 'upcoming':
                return 'No upcoming calls';
            case 'recordings':
                return 'No recordings';
            default:
                return '';
        }
    }


    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map(meeting => meeting.queryRecordings()))

                const recordings = callData.filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings)
                console.log({ recordings })
                setRecordings(recordings as unknown as CallRecording[])
            } catch (error) {
                console.log(error)
            }
        }

        if (type == "recordings") fetchRecordings();
    }, [type, callRecordings])

    const calls = getCalls();
    const noCallsMessage = getNoCallMessage();

    if (isLoading) return <Loader2 />
    return (
        <View className='flex flex-col gap-4'>
            {calls && calls.length > 0 ?
                calls.map((call: Call | CallRecording, index) => {
                    const isCallRecording = (item: Call | CallRecording): item is CallRecording => {
                        return 'filename' in item;
                    };
                    if (isCallRecording(call)) {
                        console.log({ call })
                        return <CallCard
                            date={`${new Date((call as CallRecording).start_time).toLocaleString()} - ${new Date((call as CallRecording).end_time).toLocaleString()}`}
                            link={(call as CallRecording).url}
                            type={type}
                            key={(call as CallRecording).filename}
                            title={`Recording ${index}`}
                        />
                    }
                    return <CallCard
                        date={(call as Call).state.startsAt?.toLocaleString()}
                        link={"/meeting/" + (call as Call).id}
                        type={type}
                        key={(call as Call).id}
                        title={(call as Call).state.custom.name}
                    />
                })
                : <Text>{noCallsMessage}</Text>}
        </View>
    )
}
