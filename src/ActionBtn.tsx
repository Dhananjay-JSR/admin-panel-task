import { CellContext } from "@tanstack/react-table";
import React from "react";
import { DataType } from "./App";

export function ActionBtn({
  props, EditMarkedRow, setEditMarkedRow, setPresenvedData,
}: {
  props: CellContext<DataType, unknown>;
  EditMarkedRow: string | null;
  setEditMarkedRow: React.Dispatch<React.SetStateAction<string | null>>;
  setPresenvedData: React.Dispatch<React.SetStateAction<DataType[]>>;
}) {
  const RowID = props.row.id;
  if (RowID == EditMarkedRow) {
    return (
      <>
        <button
          className="bg-green-500 save border px-2 py-0.5 rounded-md hover:bg-green-200 transition-all"
          onClick={() => {
            setEditMarkedRow(() => null);
          }}
        >
          Save
        </button>
      </>
    );
  }
  return (
    <>
     <button
        className="bg-blue-400 edit border px-2 py-0.5 rounded-md hover:bg-blue-200 transition-all"
        onClick={() => {
          setEditMarkedRow(() => RowID);
        }}
      >
        Edit
      </button>
      <button
        className="ml-5 bg-red-400 delete border px-2 py-0.5 rounded-md hover:bg-red-200 transition-all"
        onClick={() => {
          // alert(props.row.id);
          const SelectedTd = props.row.getValue("MainID");
          setPresenvedData((prev) => prev.filter((data) => data.id != SelectedTd)
          );
          if (props.row.getIsSelected()) {
            props.row.toggleSelected();
          }
        }}
      >
        Delete
      </button>
     
    </>
  );
}
