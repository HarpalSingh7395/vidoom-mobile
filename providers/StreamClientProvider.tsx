import { Loader2 } from "~/lib/icons/Loader";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";


const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;


export const StreamClientProvider = ({ children }: PropsWithChildren) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        if (!user || !isLoaded) return;
        if (!apiKey) throw new Error("No Stream API key found.")
        const getStreamVideoClient = async () => {
            const token = await getToken()
            const res = await fetch("https://vidoom.vercel.app/api/stream-token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token || ""
                }
            }).then(res => res.json()).catch(console.log)
            console.log(res)
            if (!res) return
            const client = new StreamVideoClient({
                apiKey: apiKey,
                user: {
                    id: user.id,
                    name: user.username || user.id,
                    image: user.imageUrl,
                },
                token: res.token,
            })
            setVideoClient(client)
        }
        getStreamVideoClient()
    }, [user, isLoaded])

    if (!videoClient) return <View className="flex-1 justify-center items-center"><ActivityIndicator /></View>;

    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};