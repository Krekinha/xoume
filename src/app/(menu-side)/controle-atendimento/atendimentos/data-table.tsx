"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GrStatusGood } from "react-icons/gr";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="bg-violet-100 rounded-lg grid grid-rows-3 w-full my-3
                 shadow-sm shadow-gray-100 border p-1.5"
              >
                <div className="row-start-1 bg-blue-200 flex gap-2 items-center">
                  <div>
                    <GrStatusGood className="text-green-500 h-4 w-4" />
                  </div>
                  <div className="textsm">{row.getValue("descricao")}</div>

                  {/*{flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
                </div>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
