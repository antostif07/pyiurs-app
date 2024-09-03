export default function getTimeStatus(time?: string|null) {
    if(!time) {
        return "ABSENT"
    } else {
        const hour = time.split(":")[0]
        const minutes = time.split(":")[1]

        // Convert Hour to seconds
        const hourSeconds = (parseInt(hour) * 60 * 60) + (parseInt(minutes) * 60)

        if(hourSeconds < 32460) {
            return "PRESENT"
        } else if(hourSeconds > 36060){
            return 'RETARD'
        } else {
            return `R -${parseInt(hour) - 8}`
        }
    }
}