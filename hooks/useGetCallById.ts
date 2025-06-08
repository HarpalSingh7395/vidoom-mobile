import { Call, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useCallback, useEffect, useState } from "react"

export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const client = useStreamVideoClient();
    const fetchCall = useCallback(async () => {
        console.log("Getting call response")
        const result = await client?.queryCalls({
            filter_conditions: {
                id: id
            }
        })
        console.log("Got calls response", result?.calls.length)
        if (result?.calls?.length && result?.calls?.length > 0) setCall(result?.calls[0])
        setIsLoading(false)
        return result?.calls
    }, [client, id])

    useEffect(() => {
        console.log("Fetching call", client)
        if (!client) return;
        fetchCall();
    }, [client, id, fetchCall])

    return { call, isLoading };
}