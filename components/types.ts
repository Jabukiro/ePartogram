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
export interface Patient {
    demographics: PatientDemographics,
    status: "Alert" | "Attention",
    data: Object
}
const patientDemKeys = ["marital_status", "country", "province", "district", "suburb", "literacy", "religion"]
export function isPatient(obj: Object): obj is PatientDemographics{
    return patientDemKeys.every((key)=>obj.hasOwnProperty(key))
}
