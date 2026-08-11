import type { ColDef } from "ag-grid-community";
import type { Employee } from "../../data";
import {
  DepartmentBadge,
  EmployeeCell,
  ManagerCell,
  RatingMeter,
  SalaryCell,
  SkillsCell,
  StatusPill,
  TenureCell,
} from "./cellRenderers";

export const columnDefs: ColDef<Employee>[] = [
  {
    headerName: "Employee",
    field: "lastName",
    valueGetter: (p) => `${p.data?.firstName} ${p.data?.lastName}`,
    cellRenderer: EmployeeCell,
    minWidth: 240,
    flex: 1.4,
    pinned: "left",
  },
  {
    headerName: "Department",
    field: "department",
    cellRenderer: DepartmentBadge,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Location",
    field: "location",
    minWidth: 130,
    flex: 1,
  },
  {
    headerName: "Salary",
    field: "salary",
    cellRenderer: SalaryCell,
    filter: "agNumberColumnFilter",
    minWidth: 170,
    flex: 1,
  },
  {
    headerName: "Hired / Tenure",
    field: "hireDate",
    cellRenderer: TenureCell,
    filter: "agDateColumnFilter",
    filterParams: {
      comparator: (filterDate: Date, cellValue: string) => {
        const cellDate = new Date(cellValue);
        if (cellDate < filterDate) return -1;
        if (cellDate > filterDate) return 1;
        return 0;
      },
    },
    minWidth: 170,
    flex: 1,
  },
  {
    headerName: "Performance",
    field: "performanceRating",
    cellRenderer: RatingMeter,
    filter: "agNumberColumnFilter",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Projects",
    field: "projectsCompleted",
    filter: "agNumberColumnFilter",
    cellClass: "cell-center mono",
    headerClass: "header-center",
    minWidth: 110,
  },
  {
    headerName: "Status",
    field: "isActive",
    cellRenderer: StatusPill,
    filter: false,
    sortable: true,
    minWidth: 120,
  },
  {
    headerName: "Skills",
    field: "skills",
    cellRenderer: SkillsCell,
    filter: false,
    sortable: false,
    minWidth: 190,
    flex: 1,
  },
  {
    headerName: "Manager",
    field: "manager",
    cellRenderer: ManagerCell,
    minWidth: 160,
    flex: 1,
  },
];

export const defaultColDef: ColDef<Employee> = {
  sortable: true,
  resizable: true,
  filter: true,
};
