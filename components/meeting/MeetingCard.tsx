import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { cn } from "~/lib/utils"
import { ReactNode } from "react"

type MeetingCardProps = {
    icon: ReactNode;
    title: string;
    description: string;
    type: string;
    onPress?: (type: string) => void;
    className?: string;
};

const MeetingCard = ({ description, icon, onPress, title, type, className }: MeetingCardProps) => {
    return (
        <TouchableOpacity
            className={cn(
                "rounded-lg p-4 text-white flex justify-between",
                className
            )}
            onPress={() => onPress?.(type)}
            activeOpacity={0.8}
        >
            <View className="rounded-md p-2 bg-white/30 w-auto self-start">
                {icon}
            </View>

            <View>
                <Text className="text-lg font-bold text-white">{title}</Text>
                <Text className="text-white text-xs">{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MeetingCard
