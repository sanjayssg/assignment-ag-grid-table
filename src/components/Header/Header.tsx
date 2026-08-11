import "./Header.css";

export function Header() {
  return (
    <header className="dashboard-header">
      <span className="eyebrow dashboard-header__eyebrow">FactWise: Workforce Roster</span>
      <h1 className="dashboard-header__title">Team Roster</h1>
      <p className="dashboard-header__subtitle">
        A live, searchable record of every person on staff, built on client-side AG Grid so it stays fast whether
        you're browsing twenty rows
      </p>
    </header>
  );
}
