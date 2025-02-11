import CreateAuditForm from "../../../src/ui/CreateAuditForm"
import apiGetData from "@/src/actions/apiGetData";
import {Assignment} from "@/src/common/Assignment";

export default async function AddAuditMission() {
    const assignments = await apiGetData<Assignment>(`/assignments`, 'assignments')
    

    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Créer une mission d'audit</h1>
            </div>
            <div className="mt-8">
                <CreateAuditForm affectations={assignments['hydra:member'] || []} />
            </div>
        </div>
    )
}