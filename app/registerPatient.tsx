import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { MainContainer, MyTextInput, MyButton } from '@/components';
import { addActivePatient, toRFC3339 } from '@/api';
import { useAppTheme } from './_layout';

import { DataPoint, Patient, PatientDemographics } from '@/components/types';
export default function RegisterPatientScreen() {
    const defaultPatientDemo: PatientDemographics = {
        first_name: "Fridah",
        surname: "Mulenga",
        dob: "11/12/1997",
        marital_status: "single",
        country: "Zambia",
        province: "Lusaka",
        district: "Lusaka",
        suburb: "Ibex Meanwood",
        literacy: "A9",
        religion: "Christian",
    }
    const theme = useAppTheme();
    const [patient, setPatient] = React.useState(defaultPatientDemo);
    function handlePatientChange<Key extends keyof PatientDemographics>(value: string, name: Key) {
        setPatient((patient) => (
            {
                ...patient,
                [name]: value
            }
        ));
    }

    const addPatient = () => {
        const newPatient: Patient = {
            demographics: patient,
            status: "Attention",
            data: [
                { key: "fhr", display_name: "Fetal Heart Rate", "reading": "130", next_reading: toRFC3339() },
                { key: "dilation", display_name: "Dilation", "reading": "9", next_reading: toRFC3339() },
                { key: "count", display_name: "Count", "reading": "4", next_reading: toRFC3339() }
            ]
        }
        addActivePatient(newPatient).then(() => router.replace('/patientListing'));
    }
    return (
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <MainContainer>
                <View>
                    <Text variant="headlineMedium">Add New Patient</Text>
                </View>
                <View style={{ marginVertical: theme.spacing.m_2 }}>
                    <View>
                        <MyTextInput value={patient.first_name} label="First Name"
                            onChangeText={text => handlePatientChange(text, 'first_name')} />
                        <MyTextInput value={patient.surname} label="Surname"
                            onChangeText={text => handlePatientChange(text, 'surname')} />
                    </View>
                    <MyTextInput value={patient.dob} label="Birth Date"
                        onChangeText={text => handlePatientChange(text, 'dob')} />
                    <MyTextInput value={patient.marital_status} label="Marital Status"
                        onChangeText={text => handlePatientChange(text, 'marital_status')} />
                    <MyTextInput value={patient.country} label="Country"
                        onChangeText={text => handlePatientChange(text, 'country')} />
                    <MyTextInput value={patient.province} label="Province"
                        onChangeText={text => handlePatientChange(text, 'province')} />
                    <MyTextInput value={patient.district} label="District"
                        onChangeText={text => handlePatientChange(text, 'district')} />
                    <MyTextInput value={patient.suburb} label="Suburb"
                        onChangeText={text => handlePatientChange(text, 'suburb')} />
                    <MyTextInput value={patient.literacy} label="Literacy Levels"
                        onChangeText={text => handlePatientChange(text, 'literacy')} />
                    <MyTextInput value={patient.religion} label="Religion"
                        onChangeText={text => handlePatientChange(text, 'religion')} />
                </View>
                <MyButton mode="contained" size="large"
                    onPress={addPatient}
                >
                    Add Patient
                </MyButton>
            </MainContainer>
        </ScrollView>
    )
}