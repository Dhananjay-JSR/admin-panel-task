import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { DataType } from "./App";
import { GlobalFilterBtn } from "./GlobalFilterBtn";
import { CustomInputDisplay } from "./CustomInputDisplay";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { SelectionView } from "./SelectionView";
import { PaginationControls } from "./PaginationControls";
import { ActionBtn } from "./ActionBtn";

export function TableRendered({ FetchData }: { FetchData: DataType[] }) {
  const [preservedData, setPresenvedData] = useState(FetchData);
  const [EditMarkedRow, setEditMarkedRow] = useState<null | string>(null);
  const ColumnDataRT = React.useMemo(() => {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
      },
      {
        id: "MainID",
        accessorKey: "id",
        // cell: (props)=>{}
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (props) => {
          return (
            <CustomInputDisplay
              props={props}
              EditMarkedRow={EditMarkedRow}
              setPresenvedData={setPresenvedData}
            />
          );
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (props) => {
          return (
            <CustomInputDisplay
              props={props}
              EditMarkedRow={EditMarkedRow}
              setPresenvedData={setPresenvedData}
            />
          );
        },
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: (props) => {
          return (
            <CustomInputDisplay
              props={props}
              EditMarkedRow={EditMarkedRow}
              setPresenvedData={setPresenvedData}
            />
          );
        },
      },
      {
        header: "Actions",
        cell: (props) => {
          return (
            <ActionBtn
              EditMarkedRow={EditMarkedRow}
              props={props}
              setEditMarkedRow={setEditMarkedRow}
              setPresenvedData={setPresenvedData}
            />
          );
        },
      },
    ] as ColumnDef<DataType>[];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EditMarkedRow, preservedData]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    state: {
      rowSelection,
      globalFilter: globalFilter,
    },
    initialState: {
      columnVisibility: {
        MainID: false,
      },
    },
    autoResetPageIndex: false,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableGlobalFilter: true,
    getFilteredRowModel: getFilteredRowModel(),
    data: preservedData,
    columns: ColumnDataRT,
  });

  return (
    <>
      <div className="max-w-4xl mx-auto mt-4">
        <GlobalFilterBtn setGlobalFilter={setGlobalFilter} />
        <button
          onClick={() => {
            const TypeSafeSelection = table
              .getSelectedRowModel()
              .rows.map((data) => data.original.id);
            setPresenvedData((prev) =>
              prev.filter((data) => {
                if (TypeSafeSelection.includes(data.id)) {
                  return false;
                } else {
                  return true;
                }
              })
            );
            table.resetRowSelection(false);
            setEditMarkedRow(null);
          }}
          className="group float-right"
          disabled={table.getSelectedRowModel().rows.length == 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3 fill-red-700 group-disabled:fill-red-200 transition-all"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>

        <div className="p-2">
          <table className="border table-auto w-full border-slate-500 ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="border border-slate-500" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className=" text-gray-500 text-left px-3.5 py-2.5 "
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr className="border border-slate-200" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className=" px-3 py-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex mt-3">
            <SelectionView table={table} />
            <PaginationControls table={table} />
          </div>
        </div>
      </div>
    </>
  );
}


