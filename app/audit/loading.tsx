import { ReloadIcon } from "@radix-ui/react-icons"

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center min-h-48 flex-col">
            <ReloadIcon className="mr-2 h-16 w-16 animate-spin" />
            <p>Chargement en cours...</p>
        </div>
    )
}