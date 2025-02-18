import { MMKVLoader } from "react-native-mmkv-storage";
import { Patient } from "@/components/types";
const mmkv = new MMKVLoader().initialize();
const ACTIVEPATIENTSKEY = "activePatients";
/**
 * 
 * @param {JSON} value data object to store
 * @param {string} key unique key to create/overwrite data. Usually the type of the data is used as key. Hence usually a collection of said data type is stored with the same key.
 */
export async function storeData(value:JSON, key:string) {
    try {
        const jsonValue = JSON.stringify(value)
        await mmkv.setStringAsync(key, jsonValue)
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
export function getData(key: string): Object | undefined {
    try {
        const value = mmkv.getString(key);
        return JSON.parse(value ?? "");
    } catch (e) {
        console.log(e)
        // error reading value
    }
}

export async function retrieveActivePatients(): Promise<Array<Patient> | [] | undefined> {

    try {
        const value = await mmkv.getArrayAsync(ACTIVEPATIENTSKEY) as Array<Patient> ?? [];
        return value;
    } catch (e) {
        console.log(e)
        return 
        // error reading value
    }

}
export async function updateActivePatients(activePatients: Array<Patient>) {
    try {
        const value = await mmkv.setArrayAsync(ACTIVEPATIENTSKEY, activePatients);
        return !!value;
    } catch (e) {
        console.log(e)
        return 
        // error reading value
    }
}
export async function addActivePatient(newPatient: Patient) {
    let activePatients = await retrieveActivePatients();
    if (activePatients == undefined){
        console.log("Expected to receive Patient records or empty object got undefined instead. Error might have happened whilst getting patient records.");
    } else if (activePatients.length == 0) {
        //no existing record
        try {
            const value = await mmkv.setArrayAsync(ACTIVEPATIENTSKEY, [activePatients]);
            return !!value;
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

//For development purposes only
//unsafe to have so maybe remove it for production
export function __clear() {
    console.log("Clearing Active Patients List")
    try {
        mmkv.removeItem(ACTIVEPATIENTSKEY);
        return;
    } catch (e) {
        console.log(e)
        // saving error
    }
}