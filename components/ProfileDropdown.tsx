import * as React from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';
import Animated from 'react-native-reanimated';
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';
import * as Linking from 'expo-linking'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react-native'; // Or your preferred logout icon
import { View } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileDropdown() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/sign-in'))
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="w-10 h-10 rounded-full" alt={''}>
                    <AvatarImage source={{ uri: user?.imageUrl }} />
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-72 p-4 gap-2">
                {/* User Info */}
                <View className="flex-row items-center gap-2">
                    <Avatar className="w-8 h-8 rounded-full" alt={''}>
                        <AvatarImage source={{ uri: user?.imageUrl }} />
                    </Avatar>
                    <View className="flex-1">
                        <Text className="font-semibold text-base text-foreground">
                            {user?.fullName}
                        </Text>
                        <Text className="text-xs text-muted-foreground">
                            {user?.primaryEmailAddress?.emailAddress}
                        </Text>
                    </View>
                </View>

                <DropdownMenuSeparator />

                {/* Options */}
                <DropdownMenuGroup>
                    <DropdownMenuItem onPress={() => router.push('/profile')}>
                        <View className="flex-row items-center gap-2">
                            <User size={16} />
                            <Text className="text-sm">Profile</Text>
                        </View>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Text>Join Meeting</Text>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem onPress={handleSignOut}>
                    <View className="flex-row items-center gap-2">
                        <LogOut size={16} />
                        <Text className="text-red-500 text-sm">Log out</Text>
                    </View>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
