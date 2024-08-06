"use client"

import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

export const LoadingButton = ({pending, text}: {pending?: boolean, text: string}) => {
    return (
        <Button type="submit" className="my-8" disabled={pending}>
            {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : text}
        </Button>
    )
}