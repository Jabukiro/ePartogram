import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MainContainer, MyButton, MyTextInput } from '../components';
import { useAppTheme } from '@/app/_layout';

export default function LoginScreen() {
    const theme = useAppTheme();
    const [state, setState] = React.useState({ username: "", password: "" });
    const handleChange = (value: string, name: "username" | "password") => {
        setState(prevState => (
            {
                ...prevState,
                [name]: value,
            }
        ));
    }
    return (
        <MainContainer full={true} style={{ flex: 1, justifyContent: "center", paddingHorizontal: 50 }}>
            <Text variant="headlineMedium" style={{ marginBottom: theme.spacing.m_2, textAlign: "center" }}>Login</Text>
            <View style={{ marginBottom: theme.spacing.m_1 }}>
                <MyTextInput label="Username" placeholder='Email or Phone Number'
                    onChangeText={text => handleChange(text, 'username')} />
                <MyTextInput label="Password"
                    onChangeText={text => handleChange(text, 'password')} />
            </View>
            <MyButton size="large" mode="contained">Login</MyButton>
        </MainContainer>
    )
}