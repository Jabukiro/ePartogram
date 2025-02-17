import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Surface, Text, ThemeProvider, useTheme } from 'react-native-paper';
import { MainContainer, MyButton, MyTextInput } from '../components';
import { useAppTheme } from '@/app/_layout';


export default function Register() {
    const theme = useAppTheme();
    const [hccDetails, sethccDetails] = React.useState({
        name: "",
        province: "",
        district: "",
        address: "",
    });
    const [providerDetails, setProviderDetails] = React.useState({
        email: "",
        firt_name: "",
        surname: "",
        qualifications: "",
        department: "",
        tel: "",
    });
    const handleHccChange = (value: string, name: "name" | "province" | "district" | "address") => {
        sethccDetails(hccDetails => (
            {
                ...hccDetails,
                [name]: value,
            }
        ));
    }
    const handleProvChange = (value: string, name: "email" | "first_name" | "surname" | "qualifications" | "department" | "tel") => {
        setProviderDetails(providerDetails => (
            {
                ...providerDetails,
                [name]: value,
            }
        ))
    }
    return (
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <MainContainer>
                <View>
                    <Text variant="headlineLarge">Register</Text>
                </View>
                <Surface style={{ marginVertical: theme.spacing.m_2, marginHorizontal: theme.spacing.m_05 }} elevation={0}>
                    <Text variant="titleLarge" style={{ marginBottom: theme.spacing.m_1 }}>Health Care Center Details:</Text>
                    <MyTextInput label="Name"
                        onChangeText={text => handleHccChange(text, 'name')} />
                    <MyTextInput label="Province"
                        onChangeText={text => handleHccChange(text, 'province')} />
                    <MyTextInput label="District"
                        onChangeText={text => handleHccChange(text, 'district')} />
                    <MyTextInput label="Address"
                        onChangeText={text => handleHccChange(text, 'address')} />
                </Surface>
                <Surface elevation={0} style={{ marginVertical: theme.spacing.m_2, marginHorizontal: theme.spacing.m_05 }}>
                    <Text style={{ marginBottom: theme.spacing.m_1 }} variant="titleLarge">Provider (You) Details:</Text>
                    <View style={{ flex: 0, flexDirection: "row", minWidth: "100%", justifyContent: 'space-between', marginBottom: theme.spacing.m_05 }}>
                        <MyTextInput style={{ flex: 0, width: "49%" }} label="First Name"
                            onChangeText={text => handleProvChange(text, 'first_name')} />
                        <MyTextInput style={{ flex: 0, width: "49%" }} label="Surname"
                            onChangeText={text => handleProvChange(text, 'surname')} />
                    </View>
                    <MyTextInput label="Qualifications"
                        onChangeText={text => handleProvChange(text, 'qualifications')} />
                    <MyTextInput label="Department"
                        onChangeText={text => handleProvChange(text, 'department')} />
                    <MyTextInput label="Email"
                        onChangeText={text => handleProvChange(text, 'email')} />
                    <MyTextInput label="Contact Number"
                        onChangeText={text => handleProvChange(text, 'tel')} />
                </Surface>
                <MyButton size="large" mode="contained">Register</MyButton>
            </MainContainer>
        </ScrollView>
    )
}
