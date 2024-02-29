"use client"

import React, { Fragment, useEffect, useState } from "react"
import {
    ChevronDownIcon,
} from "@radix-ui/react-icons"
import moment from "moment"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import IncidentPanel from "./incidentPanel"


import { Button } from "@/components/ui/button"
import SearchSelect from "./searchSelect"
import useData from "../customHooks/useData"
import { AlertCircle } from "lucide-react"

let firstIndex = 0
let lastIndex = 10
function AnalyticsTable() {
    const { Analytics } = useData()
    const [filterAnalytics, setFilterAnalytics] = useState<any[]>(Analytics?.slice(firstIndex, lastIndex))
    const [totalPage, setTotalPage] = useState(Math.ceil(Analytics?.length / 10))

    const [selectedIncident, setSelectedIncident] = useState([])
    const [columnFilters, setColumnFilters] = useState(
        [
            { name: "severity", checked: true },
            { name: "title", checked: true },
            { name: "rule type", checked: true },
            { name: "status", checked: true },
            { name: "tactics", checked: true },
            { name: "techniques", checked: true },
            { name: "source name", checked: true },
            { name: "last modified", checked: true }
        ]
    )
    const [pageNo, setPageNo] = useState(1)

    const handleRow = async (row: any) => {
        console.log(row);
        setSelectedIncident(row)
        const panel: any = document.querySelector("#incidentPanel")
        panel.click()
    }
    const [filterValue, setFilteredValue] = useState("")
    const severity = ["All", "Low", "Medium", "High", "Informational"]
    const status = ["All", "Enable", "Disable"]
    const handleSelect = (value: any) => {
        setPageNo(1)
        setFilteredValue(value === "all" ? "" : value)
        firstIndex = 0
        lastIndex = 10
        if (value === "all") {
            setFilterAnalytics(Analytics.slice(firstIndex, lastIndex))
            setTotalPage(Math.ceil(Analytics?.length / 10))
            return
        }
        let key = severity?.includes(value.charAt(0).toUpperCase() + value.slice(1)) ? "severity" : "status"
        let AnalyticsFilter = Analytics?.filter((item: any) => {
            return item.properties[`${key}`]?.toLowerCase() === value
        })
        setFilterAnalytics(AnalyticsFilter)
        setTotalPage(Math.ceil(AnalyticsFilter?.length / 10))

    }
    const handleChange = (ev: any, key: any) => {
        const { value } = ev.target
        setFilteredValue(value === "" ? "" : value)

        firstIndex = 0
        lastIndex = 10
        setPageNo(1)
        if (value === "") {
            setFilterAnalytics(Analytics)
            return
        }
        let AnalyticsFilter = Analytics?.filter((item: any) => {
            return item.properties[`${key}`]?.toLowerCase().includes(value.toLowerCase())
        })
        setTotalPage(Math.ceil(AnalyticsFilter?.length / 10))

        setFilterAnalytics(AnalyticsFilter.slice(firstIndex, lastIndex))
    }
    const handlePagination = ((sign: any) => {
        if (sign === "+") {
            firstIndex += 10
            lastIndex += 10
            setPageNo(pageNo + 1)
        } else {
            firstIndex -= 10
            lastIndex -= 10
            setPageNo(pageNo - 1)
        }
        (filterValue === "all" || filterValue === "") ?
            setFilterAnalytics(Analytics.slice(firstIndex, lastIndex))
            :
            setFilterAnalytics(Analytics.filter((e: any) => (e.properties.severity.toLowerCase() === filterValue)).slice(firstIndex, lastIndex))
    })
    const getCellContent = (index: any, row: any) => {
        const { properties } = row
        switch (index) {
            case 0:
                return (
                    <span
                        style={{
                            color: `${properties?.severity === "Low"
                                ? "#DFA693"
                                : properties?.severity === "Medium"
                                    ? "#E14B32"
                                    : properties?.severity === "High"
                                        ? "#C33726"
                                        : "#c2c2c2"
                                }`
                        }}
                    >
                        {properties?.severity}
                    </span>
                );
            case 1:
                return properties.displayName;
            case 2:
                return row.kind?.replace(/([A-Z])/g, ' $1').trim();
            case 3:
                return properties.enabled ? "Enable" : "Disable";
            case 4:
                return <TooltipProvider>
                    <Tooltip>
                        <div className="flex items-center gap-1">

                       <span>
                       {properties?.tactics?.[0]?.replace(/([A-Z])/g, ' $1').trim()}
                       </span>
                        {
                            properties?.tactics?.length > 1 &&
                            <TooltipTrigger><AlertCircle className="w-4 h-4" /></TooltipTrigger>
                        }
                        </div>

                        <TooltipContent>

                            <ul className="text-sm font-medium list-disc px-3 ">
                                {properties?.tactics?.map((tactic: any, index: number) => (
                                    <li key={index}>
                                  
                                        {tactic.replace(/([A-Z])/g, ' $1').trim()}
                                    </li>
                                ))}

                            </ul>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                    ;
            case 5:
                return <TooltipProvider>
                <Tooltip>
                    <div className="flex items-center gap-1">

                   <span>
                   {properties?.techniques?.[0]?.replace(/([A-Z])/g, ' $1').trim()}
                   </span>
                    {
                        properties?.techniques?.length > 1 &&
                        <TooltipTrigger><AlertCircle className="w-4 h-4" /></TooltipTrigger>
                    }
                    </div>

                    <TooltipContent>

                        <ul className="text-sm font-medium list-disc px-3 ">
                            {properties?.techniques?.map((technique: any, index: number) => (
                                <li key={index}>
                              
                                    {technique.replace(/([A-Z])/g, ' $1').trim()}
                                </li>
                            ))}

                        </ul>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
                ;
            case 6:
                return moment(properties.lastModifiedTimeUtc).format("DD/MM/YYYY hh:mm A");
            case 7:
                return moment(properties.lastModifiedUtc).format("DD/MM/YYYY hh:mm A");
            default:
                return null;
        }
    };
    return (
        <>



            <div className="w-full">
                <div className="flex items-center gap-4 py-4">
                    <Input
                        placeholder="Filter title..."
                        className="max-w-sm"
                        onChange={(ev) => { handleChange(ev, "title") }}
                    />

                    <SearchSelect data={severity}  handleSelect={handleSelect}></SearchSelect>
                    <SearchSelect data={status}  handleSelect={handleSelect}></SearchSelect>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {columnFilters?.map((column: any, i: number) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.name}
                                            className="capitalize"
                                            checked={column.checked}
                                            onCheckedChange={(value) => {
                                                setColumnFilters((prev) => {
                                                    const updatedFilters = prev.map((filter, index) => {
                                                        if (index === i) {
                                                            return { ...filter, checked: value };
                                                        }
                                                        return filter;
                                                    });
                                                    return updatedFilters;
                                                });
                                            }}

                                        >
                                            {column.name}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border ">
                    {
                        columnFilters?.length > 0 &&
                        <Table>
                            <TableHeader>
                                <TableRow >
                                    {columnFilters.map((header: any) => {
                                        return (
                                            <Fragment key={header.name} >
                                                {header.checked && <TableHead className="capitalize">
                                                    {header.name}
                                                </TableHead>}
                                            </Fragment>
                                        )
                                    })}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filterAnalytics?.length ? (
                                    filterAnalytics?.map((row: any) => {
                                       
                                        return <TableRow
                                            key={row.id}
                                            onClick={() => {
                                                handleRow(row)
                                            }}
                                        >
                                            {columnFilters.map((filter, index) => {
                                                if (filter.checked) {
                                                    return (
                                                        <TableCell key={index}>
                                                            {getCellContent(index, row)}
                                                        </TableCell>
                                                    );
                                                }
                                                return null;
                                            })}

                                        </TableRow>
                                    }
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columnFilters?.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    }
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    {/* <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div> */}
                    <div className="flex-1 text-sm text-muted-foreground">
                        {pageNo} of {totalPage} page(s).</div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePagination("-")}
                            disabled={pageNo === 1}

                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePagination("+")}
                            disabled={pageNo === totalPage}

                        // disabled={}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <IncidentPanel selectedIncident={selectedIncident} />
        </>

    )
}


export default AnalyticsTable
