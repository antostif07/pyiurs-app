import {Loader2Icon} from "lucide-react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className={'min-w-full min-h-full flex justify-center items-center'}>
            <Loader2Icon className={'w-8 h-8 animate-spin'} />
            Chargement
        </div>
    )
}