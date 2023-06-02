import classNames from "classnames";

export interface TableProps {
  header: {
    content?: React.ReactNode;
    align?: "left" | "right" | "center";
  }[];
  rows: React.ReactNode[][];
}

export function Table({ header, rows }: TableProps) {
  return (
    <table>
      {header && (
        <thead>
          <tr className={classNames("border-b", "border-neutral-400")}>
            {header.map((headerItem, index) => (
              <th
                key={`table-header-${index}`}
                className={classNames(
                  "p-2",
                  {
                    "text-left":
                      !headerItem.align || headerItem.align === "left",
                    "text-center": headerItem.align === "center",
                    "text-right": headerItem.align === "center",
                  },
                  "font-bold"
                )}
              >
                {headerItem.content}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={`table-row-${rowIndex}`}
            className={classNames(
              "border-b",
              "last:border-b-0",
              "border-neutral-300",
              {
                "text-left":
                  !header.at(rowIndex)?.align ||
                  header.at(rowIndex)?.align === "left",
                "text-center": header.at(rowIndex)?.align === "center",
                "text-right": header.at(rowIndex)?.align === "center",
              }
            )}
          >
            {row.map((rowItem, columnIndex) => (
              <td
                key={`table-cell-${rowIndex}-${columnIndex}`}
                className={classNames("p-2")}
              >
                {rowItem}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
