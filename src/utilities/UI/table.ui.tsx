import type { ReactNode } from "react";
import { Table } from "rizzui";

type TableUIProps<T> = {
  headerClassName?: string;
  headerData: string[];
  columnKeys: (keyof T | string)[];
  data: T[];
  rowClassName?: string;
  cellClassName?: string;
  columnRenderers?: Partial<Record<string, (row: T) => ReactNode>>;
};

export function TableUIComponent<T extends Record<string, any>>({
  headerClassName,
  headerData,
  columnKeys,
  data,
  rowClassName,
  cellClassName,
  columnRenderers = {},
}: TableUIProps<T>) {
  return (
    <div
      className={`w-full overflow-x-auto rounded-lg bg-white border-gray-200 min-h-[150px] ${
        Array.isArray(data) && data?.length > 0 && "shadow-sm border "
      }`}
    >
      <Table variant="modern" className="min-w-full text-sm">
        {/* HEADER */}
        <Table.Header className={`${headerClassName || ""}`}>
          <Table.Row className="bg-white-warm shadow-sm border-b border-gray-200">
            {headerData.map((header, index) => (
              <Table.Head
                key={index}
                className="!px-4 !py-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-xs"
              >
                {header}
              </Table.Head>
            ))}
          </Table.Row>
        </Table.Header>

        {/* BODY */}
        <Table.Body>
          {Array.isArray(data) && data?.length > 0 ? (
            data?.map((row, rowIndex) => (
              <Table.Row
                key={rowIndex}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  rowClassName || ""
                }`}
              >
                {columnKeys?.map((key, cellIndex) => {
                  const content =
                    columnRenderers[key as string]?.(row) ??
                    row[key as keyof T];

                  return (
                    <Table.Cell
                      key={cellIndex}
                      className={`!px-4 !py-3 text-gray-800 whitespace-nowrap border-b border-dark-very-light-42 ${
                        cellClassName || ""
                      }`}
                    >
                      {content}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={headerData.length}
                className="!px-4 !py-6 text-center text-gray-500"
              >
                No data available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
