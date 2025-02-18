import { Dispatch, SetStateAction } from "react"

export type StateProps<T, U=Dispatch<SetStateAction<T>>> = [T, U];
export type Province = "Central"
|"Copperbelt"
|"Eastern"
|"Luapula"
|"Lusaka"
|"Muchinga"
|"Northern"
|"North-Western"
|"Southern"
|"Western"
export interface HealthWorker {
    name: "",
    province: Province,
    district: "",
    address: "",
}
export interface PatientDemographics {
    first_name: string
    surname: string
    dob: string
    marital_status: string
    country: string
    province: Province
    district: string
    suburb: string
    literacy: string
    religion: string
}
export type PatientStatus = "Normal" | "Attention" | "Alert";
export interface DataPoint{
    key: string
    display_name: string,
    reading: string
    next_reading: string//RFC3339 Time Fomat
}
export interface Patient {
    demographics: PatientDemographics,
    status: PatientStatus,
    data: Array<DataPoint>
}
const patientDemKeys = ["marital_status", "country", "province", "district", "suburb", "literacy", "religion"]
export function isPatient(obj: Object): obj is PatientDemographics{
    return patientDemKeys.every((key)=>obj.hasOwnProperty(key))
}
