/** The function creates random string like 7hlpyllkuo85isuvwhq3wf53iohwcwqrl */
export function createRandomString() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
}
