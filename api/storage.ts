import AsyncStorage from "@react-native-async-storage/async-storage";
import { Patient } from "@/components/types";

const ACTIVEPATIENTSKEY = "activePatients";
/**
 * 
 * @param {Object} value data object to store. Needs to be seriarizable to JSOn
 * @param {string} key unique key to create/overwrite data. Usually the type of the data is used as key. Hence usually a collection of said data type is stored with the same key.
 */
export async function storeData(key:string, jsonValue:Object) {
    try {
        const value = JSON.stringify(jsonValue);
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
        // saving error
    }
}

/**
 * 
 * @param {string} key unique key to retrieve data. Usually the type of the data is used as key. Hence usually a collection of said data type is returned.
 * @returns {object}
 */
export async function getData(key: string): Promise<Object | null | undefined> {
    try {
        const value = await AsyncStorage.getItem(key);
        value == null ? null : JSON.parse(value);
    } catch (e) {
        console.log(e)
        return null;
        // error reading value
    }
    return null
}

export async function retrieveActivePatients(): Promise<Array<Patient> | [] > {

    try {
        const value = await getData(ACTIVEPATIENTSKEY);
        if (value == null){
            return []
        } else {
            return value as Array<Patient>
        }
    } catch (e) {
        console.log(e)
        return []
        // error reading value
    } finally {
        return []
    }

}
export async function updateActivePatients(activePatients: Array<Patient>) {
    try {
        await storeData(ACTIVEPATIENTSKEY, activePatients);
    } catch (e) {
        console.log(e)
        // error reading value
    }
}
export async function addActivePatient(newPatient: Patient) {
    let activePatients = await retrieveActivePatients();
    if (activePatients.length == 0) {
        //no existing record
        try {
            await storeData(ACTIVEPATIENTSKEY, [newPatient]);
        } catch (e) {
            console.log(e)
            return 
            // error reading value
        }
    } else{
        (activePatients as Patient[]).push(newPatient);
        await updateActivePatients(activePatients);
    }
}

//
function getStorageKey(key: string):string{
    return `@${key}`;
}

//For development purposes only
//unsafe to have so maybe remove it for production
export function __clear() {
    console.log("Clearing Active Patients List")
    try {
        AsyncStorage.removeItem(ACTIVEPATIENTSKEY);
        return;
    } catch (e) {
        console.log(e)
        // saving error
    }
}