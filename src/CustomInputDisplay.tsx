import { CellContext } from "@tanstack/react-table";
import React, { useState } from "react";
import { DataType } from "./App";

export function CustomInputDisplay({
  props, EditMarkedRow, setPresenvedData,
}: {
  props: CellContext<DataType, unknown>;
  EditMarkedRow: string | null;
  setPresenvedData: React.Dispatch<React.SetStateAction<DataType[]>>;
}) {
  const Value = props.cell.getValue();
  const RowID = props.row.id;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, SetValue] = useState(Value as string);

  return (
    <>
      {EditMarkedRow == RowID ? (
        <input
          value={value}
          className="border-2 px-2 rounded-md"
          onBlur={(e) => {
            const TextContent = e.currentTarget.value;
            // const TargetRow = props.row.original.id
            const TargetRow = props.row.index;
            const TargetColumnName = props.column.id;
            setPresenvedData((old) => old.map((row, index) => {
              if (index === TargetRow) {
                return {
                  ...old[TargetRow],
                  [TargetColumnName]: TextContent,
                };
              }
              return row;
            })
            );
          }}
          onChange={(e) => {
            const TextContent = e.currentTarget.value;
            SetValue(() => TextContent);
          }} />
      ) : (
        <div>{value}</div>
      )}
    </>
  );
}
