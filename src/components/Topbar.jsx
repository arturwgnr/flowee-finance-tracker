export default function Topbar() {
  return (
    <div>
      <header className="top-bar">
        <h2 className="logo">Flowee</h2>
        <nav className="nav-options">
          <button>Transactions</button>
          <button>Reports</button>
          <button>Settings</button>
        </nav>
      </header>
    </div>
  );
}
