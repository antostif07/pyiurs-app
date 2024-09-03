import CreateForm from "@/src/ui/assignments/create-form";

export default function Page() {
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Ajouter une Affectation</h1>
            </div>
            <div className="mt-8">
                <CreateForm />
            </div>
        </div>
    )
}