import React from 'react';
import { WebView } from 'react-native-webview';

export const Radar = () => {
    return (
        <WebView
            style={{
                backgroundColor: 'transparant',
                width: 400,
                alignSelf: 'center'
            }}
            source={{
                uri: 'https://nextjs-chartjs-firebase.vercel.app/radar'
            }}
            scrollEnabled={false}
            automaticallyAdjustContentInsets
        />
    );
};
