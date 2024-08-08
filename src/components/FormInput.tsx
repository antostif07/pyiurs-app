
import { HTMLInputTypeAttribute } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface IFormInput {
    control?: any,
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    type?: HTMLInputTypeAttribute;
    className?: string;
    disabled?: boolean;
}
export default function FormInput(props: IFormInput) {
    const {control, name, label, placeholder, description, type, disabled, className} = props

    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field} type={type} autoComplete="off" className={className ?? ""} disabled={disabled} />
              </FormControl>
              {
                description && (
                    <FormDescription>
                        {description}
                    </FormDescription>
                )
              }
              <FormMessage />
            </FormItem>
          )}
        />
    )
}