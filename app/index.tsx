import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, Redirect } from 'expo-router'
import { verifyInstallation } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

export default function Page() {
  return (
    <SafeAreaView>
      <SignedIn>
        <Redirect href={"/(home)/(dashboard)"} />
      </SignedIn>
      <SignedOut>
        <Redirect href={"/(auth)/sign-in"} />
      </SignedOut>
      <Toaster />
    </SafeAreaView>
  )
}