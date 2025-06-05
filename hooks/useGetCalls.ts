import { useUser } from "@clerk/clerk-expo";
import { Call, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useCallback, useEffect, useState } from "react"

export const useGetCalls = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [calls, setCalls] = useState<Call[]>([]);
    const client = useStreamVideoClient();
    const { user } = useUser();

    const fetchCalls = useCallback(async () => {
        if(!client || !user?.id) return;
        setIsLoading(true);

        try {
            const { calls } = await client?.queryCalls({
                sort: [{
                    field: "starts_at",
                    direction: -1
                }],
                filter_conditions: {
                    starts_at: { $exists: true },
                    $or: [
                        { created_by_user_id: user.id },
                        { members: { $in: [user.id] } }
                    ]
                }
            }); 
            setCalls(calls)
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }, [client, user])
    
    useEffect(() => {
        fetchCalls();
    }, [client, user?.id, fetchCalls])


    const now = new Date();

    const endedCalls = calls.filter(({state: { startsAt, endedAt }}) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    });
    const upcomingCalls = calls.filter(({state: { startsAt }}) => {
        return startsAt && new Date(startsAt) > now;
    });

    return { 
        endedCalls, 
        upcomingCalls,
        callRecordings: calls,
        isLoading
     }
}