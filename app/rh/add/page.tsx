import CreateForm from "@/src/ui/employees/create-form";
import apiGetData from "@/src/actions/apiGetData";
import {Assignment} from "@/src/common/Assignment";

export default async function AddEmployee() {
    const data = await apiGetData<Assignment>('/assignments', 'assignments')

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Ajouter un employé</h1>
            </div>
            <div className="mt-8">
                <CreateForm affectations={data['hydra:member'] || []} />
            </div>
        </div>
    )
}