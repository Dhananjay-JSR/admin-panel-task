import { Table } from "@tanstack/react-table";
import { DataType } from "./App";

export function PaginationControls({ table }: { table: Table<DataType>; }) {
  return <div className="flex items-center gap-2">
    <button
      className="border rounded p-1 first-page"
      onClick={() => table.setPageIndex(0)}
      disabled={!table.getCanPreviousPage()}
    >
      {"<<"}
    </button>
    <button
      className="border rounded p-1 previous-page"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      {"<"}
    </button>
    <button
      className="border rounded p-1 next-page"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      {">"}
    </button>
    <button
      className="border rounded p-1 last-page"
      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      disabled={!table.getCanNextPage()}
    >
      {">>"}
    </button>
    <span className="flex items-center gap-1">
      <div>Page</div>
      <strong>
        {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </strong>
    </span>
  </div>;
}
