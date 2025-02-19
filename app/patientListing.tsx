import * as React from 'react';
import { Button, FlatList } from 'react-native';
import { Clock, MainContainer, PatientHomeCard } from '@/components';
import { __clear, retrieveActivePatients } from '@/api';
import { Patient, StateProps } from '@/components/types';
import { router } from 'expo-router';

export default function PatientListingScreen() {
    const [activePatients, setActivePatients]: StateProps<Patient[] | undefined> = React.useState();
    React.useEffect(() => {
        retrieveActivePatients().then(value => { console.log("Item to pateintcard", typeof value, value); setActivePatients(value); }, reason => { console.log("retreive failed with reason, ", reason) });
    }, [retrieveActivePatients]);
    const renderItem = ({ item }: { item: Patient }) => {
        return <PatientHomeCard patient={item} onExpand={() => { router.push("./partograph") }} />;
    }
    return (
        <MainContainer>
            <Clock />
            <Button
                title='Clear'
                onPress={() => __clear()}
            />
            <FlatList
                data={activePatients}
                renderItem={renderItem}
                keyExtractor={(_, index) => String(`flatListKey-${index}`)}
            />
        </MainContainer>
    )
}