"use client"

import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

export const LoadingButton = ({pending, text, className,}: {pending?: boolean, text: string, className?: string,}) => {
    const c = className ?? ""
    
    return (
        <Button 
        type="submit" 
        className={c}
        disabled={pending}
    >
            {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : text}
        </Button>
    )
}