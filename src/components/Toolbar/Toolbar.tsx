import { useMemo } from "react";
import { DEPARTMENTS, type Department, type Employee } from "../../data";
import "./Toolbar.css";

interface ToolbarProps {
  rows: Employee[];
  search: string;
  onSearchChange: (value: string) => void;
  selectedDepts: Set<Department>;
  onToggleDept: (dept: Department) => void;
  onExport: () => void;
}

export function Toolbar({ rows, search, onSearchChange, selectedDepts, onToggleDept, onExport }: ToolbarProps) {
  const deptCounts = useMemo(() => {
    const counts = {} as Record<Department, number>;
    for (const dept of DEPARTMENTS) counts[dept] = 0;
    for (const row of rows) counts[row.department] += 1;
    return counts;
  }, [rows]);

  return (
    <section className="toolbar">
      <div className="toolbar__row">
        <div className="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search name, title, skill, location"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search roster"
          />
        </div>

        <div className="dept-chips" role="group" aria-label="Filter by department">
          {DEPARTMENTS.map((dept) => {
            const active = selectedDepts.has(dept);
            return (
              <button
                key={dept}
                type="button"
                data-tone={dept.toLowerCase()}
                className={`dept-chip${active ? " dept-chip--active" : ""}`}
                onClick={() => onToggleDept(dept)}
                aria-pressed={active}
              >
                {dept}
                <span className="dept-chip__count mono">{deptCounts[dept]}</span>
              </button>
            );
          })}
        </div>

        <button type="button" className="export-button" onClick={onExport}>
          Export CSV
        </button>
      </div>
    </section>
  );
}
