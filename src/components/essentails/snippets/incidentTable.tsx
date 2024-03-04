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

import IncidentPanel from "./incidentPanel"


import { Button } from "@/components/ui/button"
import SearchSelect from "./searchSelect"

let firstIndex = 0
let lastIndex = 10
function IncidentTable({ data, filters = false }: any) {
    const [filterData, setFilterData] = useState<any[]>(data.slice(firstIndex, lastIndex))
    const [totalPage, setTotalPage] = useState(Math.ceil(data?.length / 10))

    const [selectedIncident, setSelectedIncident] = useState([])
    const [columnFilters, setColumnFilters] = useState(
        [
            { name: "severity", checked: true },
            { name: "title", checked: true },
            { name: "status", checked: true },
            { name: "alerts", checked: true },
            { name: "provider", checked: true },
            { name: "created date", checked: true },
            { name: "last modify date", checked: true }
        ]
    )
    const [pageNo, setPageNo] = useState(1)

    const handleRow = async (row: any) => {
        setSelectedIncident(row)
        const panel: any = document.querySelector("#incidentPanel")
        panel.click()
    }
    const [filterValue, setFilteredValue] = useState("")
    const severity = ["All", "Low", "Medium", "High", "Informational"]
    const status = ["All", "New", "Active"]
    const handleSelect = (value: any) => {
        setPageNo(1)
        
        setFilteredValue(value === "all" ? "" : value)
        firstIndex = 0
        lastIndex = 10
        if (value === "all") {
            setFilterData(data.slice(firstIndex, lastIndex))
            setTotalPage(Math.ceil(data?.length / 10))
            return
        }
        let key = severity?.includes(value.charAt(0).toUpperCase() + value.slice(1)) ? "severity" : "status"
        let dataFilter = data?.filter((item: any) => {
            return item.properties[`${key}`]?.toLowerCase() === value
        })
        setFilterData(dataFilter.slice(firstIndex, lastIndex))
        setTotalPage(Math.ceil(dataFilter?.length / 10))

    }
    const handleChange = (ev: any, keys: any) => {
        const { value } = ev.target
        setFilteredValue(value === "" ? "" : value)

        firstIndex = 0
        lastIndex = 10
        setPageNo(1)
        if (value === "") {
            setFilterData(data.slice(firstIndex,lastIndex))
            setTotalPage(Math.ceil(data?.length / 10))
            return
        }
        let dataFilter = data?.filter((item: any) => {
            for (let key of keys ){
                let propertyValue = item.properties[`${key}`];
                if (Array.isArray(propertyValue)) {
                    // If the property value is an array, check if any element matches the value
                    for (let val of propertyValue) {
                        if (val.toLowerCase().includes(value.toLowerCase())) {
                            return true;
                        }
                    }
                } else if (typeof propertyValue === 'string') {
                    // If the property value is a string, check if it includes the value
                    if (propertyValue.toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
    
            }
     } })
        setTotalPage(Math.ceil(dataFilter?.length / 10))

        setFilterData(dataFilter.slice(firstIndex, lastIndex))
    }
    const handlePagination = ((sign: any) => {
        debugger
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
            setFilterData(data.slice(firstIndex, lastIndex))
            :
            setFilterData(data.filter((e: any) => (e.properties.severity.toLowerCase() === filterValue)).slice(firstIndex, lastIndex))
    })
    const getCellContent = (index: any, properties: any) => {
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
                return properties.title;
            case 2:
                return properties.status;
            case 4:
                return properties.providerName;
            case 3:
                return properties.additionalData.alertsCount;
            case 5:
                return moment(properties.createdTimeUtc).format("DD/MM/YYYY hh:mm A");
            case 6:
                return moment(properties.lastModifiedTimeUtc).format("DD/MM/YYYY hh:mm A");
            case 7:
                return moment(properties.lastActivityTimeUtc).format("DD/MM/YYYY hh:mm A");
            default:
                return null;
        }
    };
    return (
        <>
           
              
              
                <div className="w-full">
                    <div className="flex items-center gap-4 py-4">
                        <Input
                            placeholder="Filter "
                            className="max-w-sm"
                            onChange={(ev) => { handleChange(ev, ["title","providerName","severity","status"]) }}
                        />

                        <SearchSelect data={severity} key="severity" handleSelect={handleSelect}></SearchSelect>
                        <SearchSelect data={status} key="status" handleSelect={handleSelect}></SearchSelect>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {columnFilters
                                    .map((column: any, i: number) => {
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
                                    {filterData?.length ? (
                                        filterData?.map((row: any) => {
                                            const { properties } = row
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
                                                                {getCellContent(index, properties)}
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


export default IncidentTable
