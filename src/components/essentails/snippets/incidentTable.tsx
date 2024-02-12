"use client"

import React, { useEffect, useState } from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import moment from "moment"
import useData from "../customHooks/useData"



// export type Payment = {
//     id: string
//     amount: number
//     status: "pending" | "processing" | "success" | "failed"
//     email: string
// }

function IncidentTable({ data, filters = false }: any) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columns, setColumns] = useState([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    useEffect(() => {
        const cols: any = [
            {
                id: "select",
                header: ({ table }: any) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }: any) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "severity",
                header: "Severity ",
                cell: ({ row }: any) => {
                    const value = row.getValue("severity")
                    return <span className="capitalize font-extrabold" style={{color:`${value==="low"?"#DFA693":value==="medium"?"#E14B32":value==="high"?"#C33726" :"#E2E2E2"}`}} >{value}</span>
                }
                ,
            },
            {
                accessorKey: "title",
                header: "Title",
                cell: ({ row }: any) => (
                    <div className="capitalize">{row.getValue("title")}</div>
                ),
            },
            {
                accessorKey: "provider",
                header: "Provider",
                cell: ({ row }: any) => (
                    <div className="capitalize">{row?.original?.vendorInformation?.provider}</div>
                ),
            },

            {
                accessorKey: "createdDateTime",
                header: () => <div className="">Created Date</div>,
                cell: ({ row }: any) => {
                    const date = new Date(row.getValue("createdDateTime"))
                    const formattedDate = moment(date).format("MM/DD/YYYY")
                    return <div>{formattedDate}</div>
                },
            },
            {
                accessorKey: "lastModifiedDateTime",
                header: () => <div className="">Modify Date</div>,
                cell: ({ row }: any) => {
                    const date = new Date(row.getValue("lastModifiedDateTime"))
                    const formattedDate = moment(date).format("MM/DD/YYYY")
                    return <div>{formattedDate}</div>
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }: any) => {
                    const payment = row.original

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <DotsHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(payment.id)}
                                >
                                    Copy payment ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View customer</DropdownMenuItem>
                                <DropdownMenuItem>View payment details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                },
            },
        ]
        setColumns(cols)
    }, [data])

    const table: any = useReactTable({
        data,
        columns,
        manualPagination: false,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,

        },

    })
    const { incidents, lowFilterIncidents, mediumFilterIncidents, highFilterIncidents, infoIncidents, infoFilterIncidents, filterIncidents, lowIncidents, highIncidents, mediumIncidents } = useData()

    return (
        <>
            <div>
                <div className='flex gap-4 '>

                    <div className='grid'>
                        <span> Low </span>
                        <span title={lowFilterIncidents?.length} style={{
                            width: `${lowFilterIncidents?.length + 5}px`
                        }} className={` h-4 bg-[#DFA693]`}></span>
                    </div>
                    <div className='grid'>
                        <span> Medium </span>
                        <span title={mediumFilterIncidents?.length} style={{
                            width: `${mediumFilterIncidents?.length + 5}px`
                        }} className={` h-4 bg-[#E14B32]`}></span>
                    </div>
                    <div className='grid'>
                        <span> High </span>
                        <span title={highFilterIncidents?.length} style={{
                            width: `${highFilterIncidents?.length + 5}px`
                        }} className={` h-4 bg-[#C33726]`}></span>

                    </div>


                    <div className='grid'>
                        <span> Informational </span>
                        <span title={infoFilterIncidents?.length} style={{
                            width: `${infoFilterIncidents?.length + 5}px`
                        }} className={` h-4 bg-[#E2E2E2]`}></span>
                    </div>
                </div>
                <div>
                </div>
                <div className="w-full">
                    <div className="flex items-center gap-4 py-4">
                        <Input
                            placeholder="Filter severity..."
                            value={(table.getColumn("severity")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("severity")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        {
                            filters && <>
                                <Input
                                    placeholder="Filter title..."
                                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn("title")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <Input
                                    placeholder="Filter Provider..."
                                    value={(table.getColumn("provider")?.getFilterValue() as string) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn("provider")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <Input
                                    placeholder="Filter date..."
                                    value={(table.getColumn("lastModifiedDateTime")?.getFilterValue() as string) || (table.getColumn("createdDateTime")?.getFilterValue()) || ""}
                                    onChange={(event) =>
                                        (table.getColumn("lastModifiedDateTime") || table.getColumn("createdDateTime"))?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                /></>
                        }
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column: any) => column.getCanHide())
                                    .map((column: any) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup: any) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header: any) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row: any) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell: any) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}


export default IncidentTable
