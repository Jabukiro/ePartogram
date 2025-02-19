import * as React from 'react';
import { Alert, Animated, Pressable, StyleSheet, View } from 'react-native';
import { Button, Surface, SurfaceProps, Text, TextInput, useTheme } from 'react-native-paper';
import { useTimer } from 'react-timer-hook';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { PressableGeneral } from '@/components';
import { DataPoint, Patient, PatientStatus } from './types';
import { AppTheme, useAppTheme } from '@/app/_layout';

interface Props {
    patient: Patient
}

export default function PatientHomeCard({ patient }: Props) {
    //console.log("Patient details: ", patient);
    const theme = useAppTheme();
    const [patientStatus, setPatientStatus] = React.useState(patient.status);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggleIsExpanded = () => { setIsExpanded(!isExpanded) };
    const nextDataPoint = getNextDueReading(patient);
    const d = new Date();
    const duetime = new Date(nextDataPoint.next_reading) - new Date();
    const {
        minutes,
    } = useTimer({ expiryTimestamp: new Date(nextDataPoint.next_reading), onExpire: () => console.warn('onExpire called') });
    return (
        <SurfaceAnimated status={patientStatus}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: theme.spacing.m_2, marginBottom: theme.spacing.m_05 }}>
                <Text variant="titleLarge" style={{ marginTop: theme.spacing.m_05 }}>{`${patient.demographics.first_name} ${patient.demographics.surname}`}</Text>
                <PressableGeneral
                    style={{
                        paddingHorizontal: theme.spacing.p_2,
                        paddingTop: theme.spacing.p_05,
                    }}
                    onPress={toggleIsExpanded}>
                    <FontAwesome name="expand" size={24} color={theme.colors.primary} />
                </PressableGeneral>
            </View>
            <View style={{ flex: 1, flexDirection: "row", marginHorizontal: theme.spacing.m_1, marginBottom: theme.spacing.m_1, }}>
                <View style={{ flex: 3, flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text>Status</Text>
                        <Button compact mode="contained"
                            buttonColor={patientStatus === "Normal" ? undefined : "#fd0103"}
                            onPress={() => { setPatientStatus(changePatientStatus(patientStatus)) }}
                            style={{ width: 80 }}
                        >{patientStatus}</Button>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text>FHR</Text>
                        <Button compact mode="outlined"
                            textColor={patientStatus === "Normal" ? undefined : "#fd0103"}
                        >{duetime > 0 ? `DUE in ${minutes}` : 'OVERDUE'}</Button>
                    </View>
                </View>
                <View style={{ flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {
                        patient.data.map((dataPoint, idx) => (
                            <View key={dataPoint.key} style={{ flex: 1, alignItems: "center" }}>
                                <Text style={{ fontSize: 10 }}>{dataPoint.display_name}</Text>
                                <Text>{dataPoint.reading}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
            <DataCard theme={theme} isExpanded={isExpanded} />
        </SurfaceAnimated>
    )
}
interface DataCardProps {
    theme: AppTheme,
    isExpanded: boolean
}
function DataCard(props: DataCardProps) {
    const onDataEntry = () => { console.warn("Data Entered") };
    return (
        <Surface style={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: props.theme.spacing.p_05,
            paddingBottom: 0,
            display: props.isExpanded ? "flex" : "none"
        }}>
            <DataInput name="FHR" theme={props.theme} onDataEntry={onDataEntry} overdue={true} />
            <DataInput name="Heart Rate" theme={props.theme} onDataEntry={onDataEntry} />
        </Surface>
    )
}

interface DataInputProps {
    name: string,
    theme: AppTheme,
    onDataEntry: any,
    overdue?: boolean
}

function DataInput(props: DataInputProps) {
    /**Best way to chage the input so that it has a redish theme. */
    const overdueTheme = props.overdue ?
        {
            ...props.theme,
            colors: {
                ...props.theme,
                primary: props.theme.colors.red,
                surfaceVariant: props.theme.colors.red3,
            }
        } : props.theme
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: props.theme.spacing.p_05,
        }}>
            <Text style={{ width: 50 }}>{props.name}:</Text>
            <TextInput
                theme={overdueTheme}
                style={{ flex: 1, height: 40, marginBottom: props.theme.spacing.p_05 }}
                keyboardType="number-pad"
                maxLength={3}
                onSubmitEditing={props.onDataEntry} />
            <PressableGeneral
                style={
                    {
                        paddingHorizontal: props.theme.spacing.m_1,
                        paddingVertical: props.theme.spacing.p_05,
                    }}
                onPress={props.onDataEntry}>
                <AntDesign name="check" size={30} color={props.theme.colors.primary} />
            </PressableGeneral>
        </View>
    )
}

interface SurfaceAnimatedProps extends SurfaceProps {
    status: PatientStatus
}
function SurfaceAnimated({ status, ...rest }: SurfaceAnimatedProps) {
    const colorAnim = React.useRef(new Animated.Value(1)).current
    const colorInterpolation = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(252, 116, 116)", "rgb(252, 179, 179)"]
    })
    const animatedStyle = {
        bacgroundColor: colorInterpolation
    }
    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(colorAnim, {
                    useNativeDriver: false,
                    toValue: 0.4,
                    duration: 800
                }),
                Animated.timing(colorAnim, {
                    useNativeDriver: false,
                    toValue: 1,
                    duration: 1200
                })
            ])
        ).start();
    }, [colorAnim]);
    if (status !== "Normal") {
        return (
            <Surface elevation={2} style={{ ...styles.container, backgroundColor: status === "Attention" ? "rgb(252, 179, 179)" : colorInterpolation }} {...rest} />
        )
    }
    return (
        <Surface elevation={2} style={styles.container} {...rest} />
    )
}

function changePatientStatus(current: PatientStatus) {
    switch (current) {
        case "Normal":
            return "Attention";
        case "Attention":
            return "Alert";
        default:
            return "Normal";
    }
}

//Returns the DataPoint soonest to be measured
const getNextDueReading = (patient: Patient): DataPoint => {
    return patient.data.reduce((prev, curr, currIdx) => {
        if (new Date(prev.next_reading) - new Date(curr.next_reading) > 0) return curr;
        return prev;
    })
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderRadius: 10,
    }
});