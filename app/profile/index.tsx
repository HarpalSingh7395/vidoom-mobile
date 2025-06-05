import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import * as Linking from 'expo-linking'


const { width, height } = Dimensions.get('window');

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
  

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Animated Background */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />

      {/* Floating Geometric Shapes */}
      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.1,
          right: width * 0.1,
          transform: [{ rotate: spin }],
        }}
        className="w-20 h-20 border-2 border-white/20 rounded-full"
      />

      <Animated.View
        style={{
          position: 'absolute',
          bottom: height * 0.2,
          left: width * 0.1,
          transform: [{ rotate: spin }],
        }}
        className="w-16 h-16 border-2 border-white/10"
      />

      {/* Main Content */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        }}
        className="flex-1 justify-center items-center px-8"
      >
        {/* Profile Section */}
        <View className="items-center mb-12">
          <Avatar className="w-24 h-24 rounded-full mb-6" alt={''}>
            <AvatarImage source={{ uri: user?.imageUrl }} />
          </Avatar>

          <Text className="text-3xl font-bold text-white text-center mb-2">
            {user?.fullName}
          </Text>

          <Text className="text-lg text-white/80 text-center">
            {user?.firstName ? `Hello ${user.firstName}` : 'Great to see you again'}
          </Text>
        </View>

        {/* Feature Cards */}
        {/* <View className="w-full space-y-4 mb-8">
          <TouchableOpacity activeOpacity={0.8}>
            <BlurView intensity={20} className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
                  <Ionicons name="rocket-outline" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-lg">Get Started</Text>
                  <Text className="text-white/70">Explore amazing features</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </View>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <BlurView intensity={20} className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
                  <Ionicons name="settings-outline" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-lg">Settings</Text>
                  <Text className="text-white/70">Customize your experience</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </View>
            </BlurView>
          </TouchableOpacity>
        </View> */}

        {/* Action Buttons */}
        <View className="w-full space-y-4">
          {/* <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white rounded-2xl py-4 px-8 shadow-lg"
          >
            <Text className="text-purple-600 font-bold text-lg text-center">
              Continue Journey
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.8}
            className="bg-white/20 rounded-2xl py-4 px-8 border border-white/30"
          >
            <Text className="text-white font-semibold text-lg text-center">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};


export default Profile;