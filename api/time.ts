/**
 * Takes a Date input and return its corresponding RFC3339 format in UTC+0.
 * @date takes a Date type as input. By default uses the current date
 * @return a date time in RFC3339 format in UTC+0. "yyyy-mm-ddThh:mm:00.00Z"
 */

export function toRFC3339(date = new Date()):string {
    const month = date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth();
    const day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();
    const hour = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
    const min = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
    return `${date.getUTCFullYear()}-${month}-${day}T${hour}:${min}:00.00Z`;
}