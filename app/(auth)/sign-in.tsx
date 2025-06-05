import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, View, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import SignInWithGoogle from '~/components/auth/SiginInWithGoogleButton'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  // Define form validation with react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Handle the submission of the sign-in form
  const onSignInPress = async (data) => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className="w-full flex-1">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex flex-col gap-4 w-full px-8">
              <View className="mb-8">
                <Text className="text-8xl font-bold text-center">V</Text>
                <Text className="text-md font-bold text-center">Vidoom</Text>
              </View>

              {/* Email Input with validation */}
              <Controller
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Input
                      placeholder="Enter email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    {errors.email && (
                      <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
                    )}
                  </View>
                )}
                name="email"
              />

              {/* Password Input with validation */}
              <Controller
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Input
                      secureTextEntry
                      placeholder="Write your password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.password && (
                      <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
                    )}
                  </View>
                )}
                name="password"
              />

              <Button className="w-full" onPress={handleSubmit(onSignInPress)}>
                <Text>Sign In</Text>
              </Button>

              <View className="relative w-full flex justify-center items-center">
                <Separator className="my-4 bg-secondary" orientation="horizontal" />
                <Text className="absolute text-xl">or</Text>
              </View>

              <SignInWithGoogle onSuccess={() => router.replace('/')} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}