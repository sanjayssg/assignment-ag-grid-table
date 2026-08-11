import { useMemo } from "react";
import type { Employee } from "../../data";
import "./KpiStrip.css";

const compactCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

function computeStats(rows: Employee[]) {
  const headcount = rows.length;
  const active = rows.filter((r) => r.isActive).length;
  const activePct = headcount ? Math.round((active / headcount) * 100) : 0;
  const avgTenureYears =
    rows.reduce((sum, r) => sum + (Date.now() - new Date(r.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25), 0) /
    (headcount || 1);
  const avgRating = rows.reduce((sum, r) => sum + r.performanceRating, 0) / (headcount || 1);
  const totalPayroll = rows.reduce((sum, r) => sum + r.salary, 0);
  return { headcount, activePct, avgTenureYears, avgRating, totalPayroll };
}

interface KpiCardProps {
  label: string;
  value: string;
  dotColor: string;
}

function KpiCard({ label, value, dotColor }: KpiCardProps) {
  return (
    <div className="kpi-card">
      <span className="kpi-card__label">
        <span className="kpi-card__dot" style={{ background: dotColor }} />
        {label}
      </span>
      <span className="kpi-card__value mono">{value}</span>
    </div>
  );
}

export function KpiStrip({ rows }: { rows: Employee[] }) {
  const stats = useMemo(() => computeStats(rows), [rows]);

  return (
    <section className="kpi-strip" aria-label="Roster summary">
      <KpiCard label="Headcount" value={stats.headcount.toLocaleString("en-US")} dotColor="var(--ink)" />
      <KpiCard label="Active" value={`${stats.activePct}%`} dotColor="var(--status-active)" />
      <KpiCard label="Avg. tenure" value={`${stats.avgTenureYears.toFixed(1)} yrs`} dotColor="var(--ink-35)" />
      <KpiCard label="Avg. performance" value={stats.avgRating.toFixed(2)} dotColor="var(--accent-gold)" />
      <KpiCard label="Annual payroll" value={compactCurrency.format(stats.totalPayroll)} dotColor="var(--dept-finance)" />
    </section>
  );
}
