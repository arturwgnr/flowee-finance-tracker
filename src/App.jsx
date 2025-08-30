import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Topbar from "./components/Topbar";

function App() {
  // 🔹 inicializa direto do localStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("savedTransactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // 🔹 salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("savedTransactions", JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(transaction) {
    setTransactions([...transactions, transaction]);
  }

  function deleteTransaction(id) {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
  }

  // 🔹 despesas apenas do mês selecionado
  const monthlyExpenses = selectedMonth
    ? transactions
        .filter((t) => {
          if (!t.date) return false;
          const month = t.date.slice(0, 7); // "YYYY-MM"
          return month === selectedMonth && t.type === "Expense";
        })
        .reduce((acc, t) => acc + t.amount, 0)
    : 0;

  // 🔹 receitas globais
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  // 🔹 despesas globais
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // 🔹 saldo global
  const balance = totalIncome - totalExpenses;

  // 🔹 lista exibida (aplica mês e categoria)
  const visibleTransactions = transactions.filter((t) => {
    if (!t.date) return false;
    const monthMatch = selectedMonth
      ? t.date.slice(0, 7) === selectedMonth
      : true;
    const categoryMatch = filterCategory ? t.category === filterCategory : true;
    return monthMatch && categoryMatch;
  });

  return (
    <div>
      <Topbar />
      <div className="app">
        <h1 className="app-title">Welcome to Flowee</h1>

        {/* 🔹 Filtros */}
        <div className="month-selector">
          <label>Month: </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />

          <label>Category: </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="General">General</option>
            <option value="Supermarket">Supermarket</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Dining">Dining</option>
            <option value="Utilities">Utilities</option>
            <option value="Salary">Salary</option>
            <option value="Investments">Investments</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* 🔹 Resumo financeiro */}
        <div className="summary">
          <div className="summary-item income">
            Total Income: €{totalIncome}
          </div>
          <div className="summary-item expense">
            Expenses this month: €{monthlyExpenses}
          </div>
          <div
            className="summary-item balance"
            style={{ color: balance >= 0 ? "#22c55e" : "#ef4444" }}
          >
            Balance: €{balance}
          </div>
        </div>

        <TransactionForm onAdd={addTransaction} />
        <TransactionList
          transactions={visibleTransactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}

export default App;
