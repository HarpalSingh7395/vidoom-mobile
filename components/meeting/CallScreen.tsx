import { Call, CallingState, useCallStateHooks, CallContent } from '@stream-io/video-react-native-sdk';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type Props = { goToHomeScreen: () => void; call: Call };

export const CallScreen = ({ goToHomeScreen, call }: Props) => {
    useEffect(() => {
        return () => {
            // cleanup the call on unmount if the call was not left already
            if (call?.state.callingState !== CallingState.LEFT) {
                call?.leave();
            }
        };
    }, [call]);

    if (!call) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Joining call...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <CallContent
                onHangupCallHandler={goToHomeScreen}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});