'use client'
import { LoaderCircleIcon } from "lucide-react";

export default function LoadingPage () {
    return (
        <div className='flex flex-col min-h-48 w-full items-center justify-center'>
            <LoaderCircleIcon className='h-12 w-12 animate-spin' />
            Chargement
        </div>
    )
}