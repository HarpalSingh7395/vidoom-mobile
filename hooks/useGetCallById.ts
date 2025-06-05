import { Call, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useCallback, useEffect, useState } from "react"

export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const client = useStreamVideoClient();
console.log({client})
    const fetchCall = useCallback(async () => {
        const result = await client?.queryCalls({
            filter_conditions: {
                id: id
            }
        })
        if (result?.calls?.length && result?.calls?.length > 0) setCall(result?.calls[0])
        setIsLoading(false)
        return result?.calls
    }, [client, id])

    useEffect(() => {
        if (!client) return;
        fetchCall();
    }, [client, id, fetchCall])

    return { call, isLoading };
}