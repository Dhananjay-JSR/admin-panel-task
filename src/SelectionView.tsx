import { Table } from "@tanstack/react-table";
import { DataType } from "./App";

export function SelectionView({ table }: { table: Table<DataType>; }) {
  return <div className="flex-1 text-sm text-muted-foreground">
    <span className="font-medium">
      {table.getFilteredSelectedRowModel().rows.length}
    </span>
    {" "}of{" "}
    {table.getFilteredRowModel().rows.length} row(s) selected.
  </div>;
}
