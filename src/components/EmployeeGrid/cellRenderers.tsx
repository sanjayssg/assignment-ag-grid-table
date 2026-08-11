import type { CustomCellRendererProps } from "ag-grid-react";
import type { Employee } from "../../data";

const MAX_SALARY_SCALE = 200000;

function initials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

function departmentTone(department: Employee["department"]) {
  return department.toLowerCase();
}

export function EmployeeCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  return (
    <div className="cell-employee">
      <span className="cell-employee__avatar" data-tone={departmentTone(data.department)}>
        {initials(data.firstName, data.lastName)}
      </span>
      <span className="cell-employee__text">
        <span className="cell-employee__name">
          {data.firstName} {data.lastName}
        </span>
        <span className="cell-employee__position">{data.position}</span>
      </span>
    </div>
  );
}

export function DepartmentBadge({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  return (
    <span className="badge" data-tone={departmentTone(data.department)}>
      {data.department}
    </span>
  );
}

export function StatusPill({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  return (
    <span className="badge badge--dot" data-tone={data.isActive ? "active" : "inactive"}>
      <span className="badge__dot" />
      {data.isActive ? "Active" : "Inactive"}
    </span>
  );
}

export function SalaryCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  const fillPercent = Math.min(100, Math.round((data.salary / MAX_SALARY_SCALE) * 100));
  return (
    <div className="cell-salary">
      <span className="cell-salary__value mono">${data.salary.toLocaleString("en-US")}</span>
      <span className="cell-salary__track">
        <span className="cell-salary__fill" style={{ width: `${fillPercent}%` }} />
      </span>
    </div>
  );
}

export function TenureCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  const hireDate = new Date(data.hireDate);
  const tenureYears = (Date.now() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const formattedHireDate = hireDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  return (
    <div className="cell-tenure">
      <span>{formattedHireDate}</span>
      <span className="cell-tenure__years mono">{tenureYears.toFixed(1)} yrs</span>
    </div>
  );
}

export function RatingMeter({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  const fillPercent = Math.min(100, (data.performanceRating / 5) * 100);
  return (
    <div className="cell-rating">
      <span className="cell-rating__track">
        <span className="cell-rating__fill" style={{ width: `${fillPercent}%` }} />
      </span>
      <span className="cell-rating__value mono">{data.performanceRating.toFixed(1)}</span>
    </div>
  );
}

const SKILLS_VISIBLE_COUNT = 2;

export function SkillsCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  const visibleSkills = data.skills.slice(0, SKILLS_VISIBLE_COUNT);
  const overflowCount = data.skills.length - visibleSkills.length;
  return (
    <div className="cell-skills" title={data.skills.join(", ")}>
      {visibleSkills.map((skill) => (
        <span className="chip" key={skill}>
          {skill}
        </span>
      ))}
      {overflowCount > 0 && <span className="chip chip--muted">+{overflowCount}</span>}
    </div>
  );
}

export function ManagerCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  if (!data.manager) return <span className="cell-muted">N/A</span>;
  return <span>{data.manager}</span>;
}
