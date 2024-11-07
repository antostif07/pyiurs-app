import WrapperImport from "@/app/rh/attendances/import/wrapper.server";

export default async function Page() {
    return (
        <WrapperImport endpoint={`/employees`} tag={'employees'} />
    )
}