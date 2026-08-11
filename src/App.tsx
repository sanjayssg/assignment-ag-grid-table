import { useRef, useState } from "react";
import type { GridApi } from "ag-grid-community";
import { employees, type Department, type Employee } from "./data";
import { Header } from "./components/Header/Header";
import { KpiStrip } from "./components/KpiStrip/KpiStrip";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { EmployeeGrid } from "./components/EmployeeGrid/EmployeeGrid";
import "./App.css";

function App() {
  const gridApiRef = useRef<GridApi<Employee> | null>(null);

  const [search, setSearch] = useState("");
  const [selectedDepts, setSelectedDepts] = useState<Set<Department>>(new Set());

  const toggleDept = (dept: Department) => {
    setSelectedDepts((prev) => {
      const next = new Set(prev);
      if (next.has(dept)) next.delete(dept);
      else next.add(dept);
      return next;
    });
  };

  const exportCsv = () => {
    gridApiRef.current?.exportDataAsCsv({ fileName: "factwise-workforce-roster.csv" });
  };

  return (
    <div className="dashboard">
      <Header />
      <KpiStrip rows={employees} />
      <Toolbar
        rows={employees}
        search={search}
        onSearchChange={setSearch}
        selectedDepts={selectedDepts}
        onToggleDept={toggleDept}
        onExport={exportCsv}
      />
      <EmployeeGrid
        rows={employees}
        search={search}
        selectedDepts={selectedDepts}
        onGridReady={(api) => {
          gridApiRef.current = api;
        }}
      />
    </div>
  );
}

export default App;
