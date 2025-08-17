// App.tsx
import React, { useState, useMemo } from "react";

import { mockTransactions, type Transaction } from "./mockData";
import CardsSummary from "./components/CardsSummary";
import Charts from "./components/Charts";

function App() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  // Totals
  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );
  const expenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );
  const balance = income - expenses;

  // Charts

  // Add transaction
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      type: form.type,
      category: form.category,
      amount: parseFloat(form.amount),
      date: form.date,
      description: form.description,
    };
    setTransactions((prev) => [...prev, newTransaction]);
    setForm({
      type: "expense",
      category: "",
      amount: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">💰 Finance Tracker</h1>

      {/* Summary cards */}
      <CardsSummary balance={balance} expenses={expenses} income={income} />

      {/* Charts */}
      <Charts transactions={transactions} />

      {/* Transaction list */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Transactions</h3>
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li key={t.id} className="flex justify-between p-2 border rounded">
              <span>
                {t.category} {t.description && `- ${t.description}`}
              </span>
              <span
                className={
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }
              >
                {t.type === "income" ? "+" : "-"}${t.amount}
              </span>
              <span>{t.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add form */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Add Transaction</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded col-span-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded col-span-2 hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
