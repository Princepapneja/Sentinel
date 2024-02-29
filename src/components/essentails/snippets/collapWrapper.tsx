import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ChevronsDown } from 'lucide-react'
const CollapWrapper = ({ header, children }: any) => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
        
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <div className="flex items-center justify-between  ">
         {header}
        <CollapsibleTrigger asChild>
          <Button size="sm" className='ml-2'>
            <ChevronsDown  className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-2">
       {children}
       
        
      </CollapsibleContent>
    </Collapsible>
        </>
    )
}

export default CollapWrapper