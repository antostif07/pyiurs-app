import { ReloadIcon } from "@radix-ui/react-icons"

export default function Loading() {
    return (
        <div className="min-w-96 min-h-96 flex justify-center items-center">
            <ReloadIcon className="mr-2 h-16 w-16 animate-spin" />
        </div>
    )
}