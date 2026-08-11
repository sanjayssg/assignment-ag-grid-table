import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { GridApi, IRowNode, RowDataUpdatedEvent } from "ag-grid-community";
import type { Department, Employee } from "../../data";
import { columnDefs, defaultColDef } from "./columns";
import { gridTheme } from "./gridTheme";
import "./EmployeeGrid.css";

interface EmployeeGridProps {
  rows: Employee[];
  search: string;
  selectedDepts: Set<Department>;
  onGridReady: (api: GridApi<Employee>) => void;
}

export function EmployeeGrid({ rows, search, selectedDepts, onGridReady }: EmployeeGridProps) {
  const gridApiRef = useRef<GridApi<Employee> | null>(null);
  const [visibleCount, setVisibleCount] = useState(rows.length);

  const isExternalFilterPresent = useCallback(() => selectedDepts.size > 0, [selectedDepts]);
  const doesExternalFilterPass = useCallback(
    (node: IRowNode<Employee>) => (node.data ? selectedDepts.has(node.data.department) : true),
    [selectedDepts],
  );

  useEffect(() => {
    gridApiRef.current?.onFilterChanged();
  }, [selectedDepts]);

  const handleGridReady = useCallback(
    (event: { api: GridApi<Employee> }) => {
      gridApiRef.current = event.api;
      onGridReady(event.api);
    },
    [onGridReady],
  );

  const handleRowDataUpdated = useCallback((event: RowDataUpdatedEvent<Employee>) => {
    setVisibleCount(event.api.getDisplayedRowCount());
  }, []);

  const handleModelUpdated = useCallback(() => {
    setVisibleCount(gridApiRef.current?.getDisplayedRowCount() ?? 0);
  }, []);

  return (
    <section className="grid-shell">
      <div className="grid-shell__grid">
        <AgGridReact<Employee>
          theme={gridTheme}
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={search}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
          onGridReady={handleGridReady}
          onRowDataUpdated={handleRowDataUpdated}
          onModelUpdated={handleModelUpdated}
          animateRows={false}
          rowBuffer={20}
        />
      </div>
      <div className="grid-shell__status">
        <span>
          Showing <strong className="mono">{visibleCount.toLocaleString("en-US")}</strong> of{" "}
          <strong className="mono">{rows.length.toLocaleString("en-US")}</strong> rows
        </span>
      </div>
    </section>
  );
}
