import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button';

type Props = {
    goToCallScreen: () => void;
    onExit?: () => void;
};

export const HomeScreen = ({ goToCallScreen, onExit }: Props) => {
    return (
        <View className='flex-1 justify-center items-center p-6 flex flex-col gap-4'>
            <Text className='text-2xl font-bold text-center'>Welcome to Video Calling Tutorial</Text>
            <Button className='w-full' onPress={goToCallScreen}>
                <Text>Join Video Call</Text>
            </Button>
            <Button className='w-full' variant={'destructive'} onPress={onExit} >
                <Text>Exit Room</Text>
            </Button>
        </View>
    );
};