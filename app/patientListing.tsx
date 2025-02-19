import * as React from 'react';
import { Button, FlatList } from 'react-native';
import { Clock, MainContainer, PatientHomeCard } from '@/components';
import { __clear, retrieveActivePatients } from '@/api';
import { Patient, StateProps } from '@/components/types';

export default function PatientListingScreen() {
    const [activePatients, setActivePatients]: StateProps<Patient[] | undefined> = React.useState();
    React.useEffect(() => {
        retrieveActivePatients().then(value => { setActivePatients(value); });
    }, [retrieveActivePatients]);
    const renderItem = ({ item }: { item: Patient }) => {
        return <PatientHomeCard patient={item} />;
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