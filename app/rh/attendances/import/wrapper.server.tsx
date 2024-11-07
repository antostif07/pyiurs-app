import CreateForm from "@/src/ui/attendances/create-form";
import apiGetData from "@/src/actions/apiGetData";
import {Employee} from "@/src/ui/employees/Employee";

export default async function WrapperImport(props: {endpoint: string, tag: string}) {
    const data = await apiGetData<Employee>(props.endpoint, props.tag)

    return (
        <div className="pt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Importer les présences</h1>
            </div>
            <div className="mt-8">
                <CreateForm employees={data['hydra:member'] || []}/>
            </div>
        </div>
    )
}