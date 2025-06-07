import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, View, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import SignInWithGoogle from '~/components/auth/SiginInWithGoogleButton'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  // Define form validation with react-hook-form
  const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      verificationCode: ''
    }
  })

  const password = watch('password') // Watch password field for matching validation
  const [pendingVerification, setPendingVerification] = React.useState(false)

  // Handle submission of sign-up form
  const onSignUpPress = async (data) => {
    if (!isLoaded) return

    try {
      // Start sign-up process using email and password provided
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display verification form
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async (data) => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.verificationCode,
      })

      // If verification was completed, set the session to active
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
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
                <View className="mb-8 w-full justify-center flex-row">
                  <Image className="text-8xl font-bold text-center w-36 h-36" source={require('~/assets/images/logo-transparent.png')} />
                </View>

                <Text className="text-xl font-bold text-center mb-4">Verify your email</Text>
                <Text className="text-center mb-6">We've sent a verification code to your email address</Text>

                {/* Verification Code Input */}
                <Controller
                  control={control}
                  rules={{
                    required: 'Verification code is required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Input
                        placeholder="Enter verification code"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                      />
                      {errors.verificationCode && (
                        <Text className="text-red-500 text-sm mt-1">{errors.verificationCode.message}</Text>
                      )}
                    </View>
                  )}
                  name="verificationCode"
                  key={"verificationCode"}
                />

                <Button disabled={isSubmitting} className="w-full" onPress={handleSubmit(onVerifyPress)}>
                  {isSubmitting ? <ActivityIndicator color={"white"} /> : <Text>Verify</Text>}
                </Button>

                <Button variant="outline" className="w-full" onPress={() => setPendingVerification(false)}>
                  <Text>Back to sign up</Text>
                </Button>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
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
              <View className="mb-8 w-full justify-center flex-row">
                <Image className="text-8xl font-bold text-center w-36 h-36" source={require('~/assets/images/logo-transparent.png')} />
              </View>

              {/* Email Input with validation */}
              <Controller
                key={"email"}
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
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Input
                      secureTextEntry
                      placeholder="Create a password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.password && (
                      <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
                    )}
                  </View>
                )}
                key={"password"}
                name="password"
              />

              {/* Confirm Password Input with validation */}
              <Controller
                control={control}
                rules={{
                  required: 'Please confirm your password',
                  validate: value => 
                    value === password || 'Passwords do not match'
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Input
                      secureTextEntry
                      placeholder="Confirm password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.confirmPassword && (
                      <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</Text>
                    )}
                  </View>
                )}
                name="confirmPassword"
              />

              <Button disabled={isSubmitting} className="w-full" onPress={handleSubmit(onSignUpPress)}>
                {isSubmitting ? <ActivityIndicator color={"white"} /> : <Text>Sign Up</Text>}
              </Button>
              
              <Button variant="outline" className="w-full" onPress={() => router.push('/sign-in')}>
                <Text>Already have an account? Sign In</Text>
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