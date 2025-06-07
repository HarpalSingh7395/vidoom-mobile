import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { RelativePathString, useRouter } from 'expo-router';
import { Video } from '~/lib/icons/Video';
import { Play } from '~/lib/icons/Play';
import { Copy } from '~/lib/icons/Copy';
import { CheckCircle } from '~/lib/icons/CheckCircle';
import { Calendar } from '~/lib/icons/Calendar';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { setStringAsync } from "expo-clipboard"
import { toast } from 'sonner-native';

type CallCardProps = {
    title: string;
    date?: string;
    link?: string;
    type: 'ended' | 'upcoming' | "recordings";
}

export default function CallCard({ title, date, link, type }: CallCardProps) {
    const router = useRouter()
    const onStartMeeting = () => {
        if (link) router.push(link as RelativePathString);
    }

    const onCopyLink = () => {
        if (!link) return;
        setStringAsync((process.env.EXPO_BASE_URL || "") + link)
        toast("Link has been copied.")
    }

    const getIcon = () => {
        switch (type) {
            case 'ended':
                return <CheckCircle size={18} />;

            case 'recordings':
                return <Video size={18} />;

            case 'upcoming':
                return <Calendar size={18} />

            default:
                return <Video size={18} />
        }
    }

    return (
        <Card>
            <CardHeader>
                <View className='flex flex-row gap-2 items-center'>{getIcon()}<CardTitle className='text-lg'>{title || "No title"}</CardTitle></View>
                <CardDescription className='pl-6'>{date}</CardDescription>
            </CardHeader>
            <CardFooter>
                {(type == "upcoming" || type == "recordings") && <View className='flex flex-row justify-end items-center gap-2 w-full'>
                    {type == "upcoming" && <Button size={'sm'} onPress={onStartMeeting}>
                        <View className='flex flex-row gap-2 items-center'><Play className='text-white h-4 w-4' /><Text>Start</Text></View>
                    </Button>}
                    {type == "recordings" && <Button size={'sm'} onPress={onStartMeeting}>
                        <View className='flex flex-row gap-2 items-center'><Play className='text-white h-4 w-4' /><Text>Play</Text></View>
                    </Button>}
                    <Button size={'sm'} className='' variant={'secondary'} onPress={onCopyLink}>
                        <View className='flex flex-row gap-2 items-center'><Copy className='h-4 w-4' /><Text>Copy Invitation Link</Text></View>
                    </Button>
                </View>}
            </CardFooter>
        </Card>
    )
}
