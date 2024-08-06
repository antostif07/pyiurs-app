export default function getTimeStatus(time?: string) {
    if(!time) {
        return "ABSENT"
    } else {
        const hour = time.split(":")[0]

        if(parseInt(hour) < 9) {
            return "PRESENT"
        } else {
            return `R -${parseInt(hour) - 8}`
        }
    }
}