import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
export default function Clock() {
    const formatClock = (date = new Date) => {
        const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${date.getHours()}:${min}`;
    };
    const [clock, setClock] = React.useState(formatClock());
    React.useEffect(() => {
        const clockIntervalID = setInterval(() => {
            setClock(formatClock());
        }, 6000);
        return () => clearInterval(clockIntervalID);
    });
    return (
        <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
            <Text variant="displayLarge" style={{ color: "#007DFF", fontSize: 30 }}>{clock}</Text>
        </View>
    );
}