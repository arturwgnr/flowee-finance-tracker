import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Topbar from "./components/Topbar";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const updatedTransactions = JSON.parse(
      localStorage.getItem("savedTransactions") || "[]"
    );
    setTransactions(updatedTransactions);
  }, []);

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

  // 🔹 lista exibida (se mês selecionado, mostra só ele; se não, mostra tudo)
  const visibleTransactions = selectedMonth
    ? transactions.filter((t) => {
        if (!t.date) return false;
        const month = t.date.slice(0, 7);
        return month === selectedMonth;
      })
    : transactions;

  return (
    <div>
      <Topbar />
      <div className="app">
        <h1 className="app-title">Welcome to Flowee</h1>

        {/* 🔹 Seletor de mês */}
        <div className="month-selector">
          <label>Month: </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>

        {/* 🔹 Resumo financeiro */}
        <div className="summary">
          <div className="summary-item income">
            Total Income: €{totalIncome}
          </div>
          <div className="summary-item expense">
            Expenses this month: €{monthlyExpenses}
          </div>
          <div className="summary-item balance">Balance: €{balance}</div>
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
