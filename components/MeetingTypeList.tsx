'use client'
import MeetingCard from '~/components/meeting/MeetingCard'
import { useState } from 'react'
import { MeetingDialog } from './MeetingDialog';
import { useUser } from '@clerk/clerk-expo';
// import { Call, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import { Plus } from "~/lib/icons/Plus"
import { CalendarHeart } from "~/lib/icons/CalendarHeart"
import { Link } from "~/lib/icons/Link"
import { Video } from "~/lib/icons/Video"
import { RelativePathString, useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import ScheduleMeetingForm from './ScheduleMeetingForm';
import JoinMeetingForm from '~/components/JoinMeetingForm';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Call, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import * as Crypto from 'expo-crypto';
import * as Clipboard from 'expo-clipboard';
import { toast } from 'sonner-native';
import { cn } from '~/lib/utils';


export default function MeetingTypeList({ className }: { className?: string } = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [meetingType, setMeetingType] = useState<'newMeeting' | 'scheduleMeeting' | 'viewRecordings' | 'joinMeeting'>();
    const [callDetails, setCallDetails] = useState<Call>();
    const router = useRouter();
    const { user } = useUser();
    const videoClient = useStreamVideoClient();
    const createMeeting = async () => {
        if (!user || !videoClient) return;
        setIsLoading(true);
        try {
            const id = Crypto.randomUUID();
            const call = videoClient.call('default', id);
            if (!call) throw new Error("Unable to create a new meeting.");

            await call.getOrCreate({
                members_limit: 5,
                data: {
                    starts_at: new Date().toISOString(),
                }
            })
            console.log("ID is ============>", call.id)
            setCallDetails(call)
            onCloseModal()
            router.navigate(`/(home)/meeting/${call.id}`)
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false);
        }
    }

    const onScheduleMeeting = async (values: {
        name: string;
        datetime: Date;
    }) => {
        if (!user || !videoClient) return;
        setIsLoading(true);
        try {
            const id = Crypto.randomUUID();
            const call = videoClient.call('default', id)
            if (!call) throw new Error("Unable to create a new meeting.")

            await call.getOrCreate({
                members_limit: 5,
                data: {
                    starts_at: values.datetime.toISOString(),
                    custom: {
                        name: values.name
                    }
                }
            })
            setCallDetails(call)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false);
        }
    }

    const onCloseModal = () => {
        setMeetingType(undefined)
        setCallDetails(undefined)
    }

    return (<>
        <View className={cn('w-full flex gap-4', className)}>
            <View className='flex flex-row justify-center gap-4'>
                <MeetingCard icon={<Plus className='text-white' />} title='Start Meeting' description='Start an instant meeting' type='new-meeting' className='bg-orange-600 flex-1 h-48' onPress={() => setMeetingType('newMeeting')} />
                <MeetingCard icon={<CalendarHeart className='text-white' />} title='Schedule Meeting' description='Plan your meeting' type='new-meeting' className='bg-blue-600 flex-1 h-48' onPress={() => setMeetingType('scheduleMeeting')} />
            </View>
            <View className='flex flex-row justify-center gap-4'>
                <MeetingCard icon={<Video className='text-white' />} title='View Recordings' description='Checkout your recordings' type='new-meeting' className='bg-purple-600 flex-1 h-48' onPress={() => router.push('/recordings')} />
                <MeetingCard icon={<Link className='text-white' />} title='Join Meeting' description='via invitation link' type='new-meeting' className='bg-yellow-600 flex-1 h-48' onPress={() => setMeetingType('joinMeeting')} />
            </View>
        </View>
        <MeetingDialog
            isOpen={meetingType == 'newMeeting'}
            onClose={onCloseModal}
            title='Start Meeting'
            description='Launch an immediate meeting session.'
        >
            <Button disabled={isLoading} onPress={createMeeting}>
                {isLoading ? <ActivityIndicator /> : <Text>Start Now</Text>}
            </Button>
        </MeetingDialog>
        <MeetingDialog
            isOpen={meetingType == 'scheduleMeeting'}
            onClose={onCloseModal}
            title='Schedule a meeting'
            description='Plan and organize meetings for future dates and times.'
        >
            {callDetails ?
                <View className='w-full flex flex-col justify-center gap-4'>
                    <Button className='w-full' onPress={() => {
                        router.push(`/meeting/${callDetails.id}`)
                    }}>
                        <Text>Start</Text>
                    </Button>
                    <Button className='w-full' variant={'outline'} onPress={async () => {
                        await Clipboard.setStringAsync((process.env.EXPO_PUBLIC_WEB_URL || "") + "/meeting/" + callDetails.id);
                        toast("Link has been copied.");
                    }}>
                        <Text>Copy Invitation Link</Text>
                    </Button>
                </View>
                : <ScheduleMeetingForm onSubmit={onScheduleMeeting} />}
        </MeetingDialog>

        <MeetingDialog
            isOpen={meetingType == 'joinMeeting'}
            onClose={onCloseModal}
            title='Join a meeting'
            description='Enter a meeting URL to join an existing session.'
        >
            <JoinMeetingForm onSubmit={async (values) => {
                const url = values.url.trim();
                const withoutQuery = url.split('?')[0]; // Remove query params
                const segments = withoutQuery.split('/').filter(Boolean); // Split and remove empty strings
                const meetingId = segments[segments.length - 1]; // Get the last segment
                setMeetingType(undefined)
                console.log('/meeting/' + meetingId as RelativePathString)
                router.push('/meeting/' + meetingId as RelativePathString);
            }} />
        </MeetingDialog>
    </>
    )
}
