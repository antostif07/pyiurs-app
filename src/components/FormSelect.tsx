import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, FieldValues } from "react-hook-form";

export interface IFormSelect {
    control?: Control<FieldValues>,
    name: string;
    options: {id: any, value: string}[];
    label: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
}

export default function FormSelect(props: IFormSelect) {
    const {name, label, options, placeholder, control, description, disabled} = props

    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled} >
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {
                            options.map((option) => (
                                <SelectItem value={option.id} key={option.id}>
                                    {option.value}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
              </Select>
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