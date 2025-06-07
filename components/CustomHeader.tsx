import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

/**
 * CustomHeader component designed for Expo Router applications
 * @param {Object} props - Component props
 * @param {string} props.title - Main title of the header
 * @param {string} props.subtitle - Optional subtitle
 * @param {boolean} props.showBackButton - Whether to show the back button
 * @param {Function} props.onBackPress - Custom back button handler
 * @param {React.ReactNode} props.rightContent - Optional content to show on the right side
 * @param {string} props.bgColor - Background color of the header
 * @param {string} props.textColor - Text color of the header
 * @param {boolean} props.transparent - Whether the header should be transparent
 */
const CustomHeader = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightContent,
  bgColor = 'white',
  textColor = 'black',
  transparent = false,
  profilePic,
  leftContent,
}: {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  transparent?: boolean;
  profilePic?: any;
  leftContent?: React.ReactNode; // NEW
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <>
      <StatusBar
        barStyle={textColor === 'white' ? 'light-content' : 'dark-content'}
        translucent={transparent}
        backgroundColor={transparent ? 'transparent' : bgColor}
      />
      <View
        className={`${transparent ? '' : bgColor === 'white' ? 'bg-white' : 'bg-black'}`}
        style={{
          paddingTop: transparent ? insets.top : insets.top + 8,
          paddingBottom: 12,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {leftContent ? (
              <View className="">{leftContent}</View>
            ) : showBackButton ? (
              <TouchableOpacity
                onPress={handleBackPress}
                className="mr-2"
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={textColor === 'white' ? 'white' : 'black'}
                />
              </TouchableOpacity>
            ) : null}

            <View className="flex-1">
              {subtitle && (
                <Text
                  className={`text-sm ${textColor === 'white' ? 'text-gray-300' : 'text-gray-500'}`}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
              )}
              <Text
                className={`text-xl font-bold ${textColor === 'white' ? 'text-white' : 'text-black'}`}
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>
          </View>

          {rightContent ? (
            rightContent
          ) : profilePic ? (
            <TouchableOpacity onPress={() => router.push('/profile')} className="ml-2">
              <View className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                <Image source={profilePic} className="w-full h-full" />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
};

/**
 * Example of how to use this CustomHeader with Expo Router in your app directory
 * This can be imported and used in your layout files
 */
export const configureHeaderForExpoRouter = (options: {
  title?: string;
  subtitle?: string;
  headerBackPress?: () => void;
  headerRight?: () => React.ReactNode;
  headerLeft?: () => React.ReactNode; // NEW
  headerStyle?: { backgroundColor: string };
  headerTintColor?: string;
  transparentHeader?: boolean;
  profilePic?: any;
} = {}) => {
  return {
    header: ({ navigation, route, options: routeOptions }) => {
      const showBackButton = navigation.canGoBack();
      const combinedOptions = { ...options, ...routeOptions };

      return (
        <CustomHeader
          title={combinedOptions.title || route.name}
          subtitle={combinedOptions.subtitle}
          showBackButton={showBackButton}
          onBackPress={combinedOptions.headerBackPress}
          rightContent={combinedOptions.headerRight && combinedOptions.headerRight()}
          leftContent={combinedOptions.headerLeft && combinedOptions.headerLeft()} // NEW
          bgColor={combinedOptions.headerStyle?.backgroundColor || 'white'}
          textColor={combinedOptions.headerTintColor || 'black'}
          transparent={combinedOptions.transparentHeader}
          profilePic={combinedOptions.profilePic}
        />
      );
    },
  };
};

export default CustomHeader;