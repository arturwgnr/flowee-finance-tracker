import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [category, setCategory] = useState("General");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Expense");

  function handleSubmit() {
    if (!amount || !date) return;

    const newTransaction = {
      id: Date.now(),
      category,
      title,
      amount: parseFloat(amount),
      date,
      type,
    };

    onAdd(newTransaction);

    console.log(newTransaction);
    console.log("its working");
    setAmount("");
    setTitle("");
    setType("Expense");
    setCategory("General");
  }

  return (
    <form
      className="transaction-form horizontal"
      onSubmit={(e) => e.preventDefault()}
    >
      <select
        onChange={(e) => setCategory(e.target.value)}
        id="category"
        className="form-select"
        required
      >
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
      <input
        className="form-input"
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add Name"
      />
      <input
        className="form-input"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="Add Amount *"
      />
      <input
        className="form-input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        className="form-select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>

      <select id="filter">
        <option value="">Filter</option>
        <option value="">Filter</option>
      </select>
      <button className="btn-add" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
}
