export const formatApiDateTimeAttendance = (datetime?: string) => {
    const h = datetime ? datetime.split("T")[0] : ""
    const t = datetime ? datetime.split("T")[1].split("+")[0].slice(0, -3) : ""

    return datetime ? `${h} ${t}` : ""
}