export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="transaction-list">
      <ul>
        {transactions.map((item) => (
          <li
            key={item.id}
            className={`transaction-item ${item.type.toLowerCase()}`}
          >
            <span className="transaction-date">{item.date}</span>

            <div className="transaction-main">
              <span className="transaction-category">{item.category}</span>
              <span className="transaction-title">{item.title || "—"}</span>
            </div>

            <span className="transaction-amount">€{item.amount}</span>

            <button className="btn-delete" onClick={() => onDelete(item.id)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
