import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-expo';
import { ActivityIndicator } from 'react-native';
import * as Linking from 'expo-linking'
import { Text } from './ui/text';
import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export default function UserAvatar() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk()

    const handleSignOut = async () => {
        try {
          await signOut()
          // Redirect to your desired page
          Linking.openURL(Linking.createURL('/(auth)/sign-in'))
        } catch (err) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }
      }

    if (isLoaded === false) return <ActivityIndicator />
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant='link'>
                    <Avatar className='w-8 h-8' alt="Zach Nugent's Avatar">
                        <AvatarImage source={{ uri: user?.imageUrl }} />
                        <AvatarFallback>
                            <Text>{user?.fullName}</Text>
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64 native:w-72'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Text>Profile</Text>
                </DropdownMenuItem>
                <DropdownMenuItem onPress={handleSignOut}>
                    <Text>Log out</Text>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}