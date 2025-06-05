import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, View } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props}>
            <View className="ml-4 mb-6">
                <Image source={require("~/assets/images/logo.webp")} style={{ width: 30, height: 30 }} />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent