import React, { useState } from 'react'
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const SearchSelect = ({ data, handleSelect }: any) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between capitalize"
                    >
                        {value
                            ? value
                            : "Select item..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search item..." className="h-9" />
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                            {data?.map((item: any) => (
                                <CommandItem
                                    key={item}
                                    value={item}
                                    onSelect={(currentValue: any,) => {
                                        setValue( currentValue)
                                        setOpen(false)
                                        handleSelect && currentValue !== value && handleSelect(currentValue)
                                    }}
                                >
                                    {item}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === item ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

        </>
    )
}

export default SearchSelect