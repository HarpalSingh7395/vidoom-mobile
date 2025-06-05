import React, { useCallback, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO } from '@clerk/clerk-expo'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { useWarmUpBrowser } from '~/hooks/use-warmup-browser'
import AntDesign from '@expo/vector-icons/AntDesign';
import { ActivityIndicator } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

type SignInWithGoogleProps = {
    onSuccess?: () => void
    onError?: (err: Error) => void
}

export default function SignInWithGoogle({ onError, onSuccess }: SignInWithGoogleProps) {
    useWarmUpBrowser()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { startSSOFlow } = useSSO()

    const onPress = useCallback(async () => {
        try {
            setIsSubmitting(true)
            // Start the authentication process by calling `startSSOFlow()`
            const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
                strategy: 'oauth_google',
                // For web, defaults to current path
                // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
                // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
                redirectUrl: AuthSession.makeRedirectUri(),
            })

            // If sign in was successful, set the active session
            if (createdSessionId) {
                setActive!({ session: createdSessionId })
                onSuccess?.()
            } else {
                // If there is no `createdSessionId`,
                // there are missing requirements, such as MFA
                // Use the `signIn` or `signUp` returned from `startSSOFlow`
                // to handle next steps
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
            onError?.(err)
        }
        finally {
            setIsSubmitting(false);
        }
    }, [])

    return (
        <Button onPress={onPress} className="w-full flex flex-row items-center gap-4">
            {isSubmitting ? <ActivityIndicator /> : <>
            <AntDesign name="google" size={20} color="red" />
                <Text>Sign In with Google</Text>
                </>}
        </Button>
    )
}