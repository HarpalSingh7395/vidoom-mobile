import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureHeaderForExpoRouter } from '~/components/CustomHeader';
import { LayoutDashboard } from "~/lib/icons/LayoutDashboard"
import { CalendarArrowUp } from "~/lib/icons/CalendarArrowUp"
import { CalendarArrowDown } from "~/lib/icons/CalendarArrowDown"
import { Video } from "~/lib/icons/Video"
import CustomDrawerContent from '~/components/CustomDrawerContent';
import { StreamClientProvider } from '~/providers/StreamClientProvider';

export default function RootLayout() {
  return (
    <StreamClientProvider>
      <GestureHandlerRootView>
        <Drawer
          screenOptions={{
            ...configureHeaderForExpoRouter({
              headerStyle: { backgroundColor: 'white' },
              headerTintColor: 'black',
            }),
          }}
          drawerContent={CustomDrawerContent}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: "Dashboard",
              headerShown: false,
              drawerIcon: ({ color, size }) => (<LayoutDashboard size={18} color={color} />)
            }}
          />
          <Drawer.Screen
            name="scheduled"
            options={{
              title: "Scheduled",
              drawerIcon: ({ color, size }) => (<CalendarArrowUp size={18} color={color} />)
            }}
          />
          <Drawer.Screen
            name="previous"
            options={{
              title: "Previous",
              drawerIcon: ({ color, size }) => (<CalendarArrowDown size={18} color={color} />)
            }}
          />
          <Drawer.Screen
            name="recordings"
            options={{
              title: "Recordings",
              drawerIcon: ({ color, size }) => (<Video size={18} color={color} />)
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </StreamClientProvider>
  );
}
