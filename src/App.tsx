// App.tsx
import React, { useState, useMemo } from "react";

import { mockTransactions, type Transaction } from "./mockData";
import CardsSummary from "./components/CardsSummary";
import Charts from "./components/Charts";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";

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
      <Transactions transactions={transactions} />

      {/* Add form */}
      <AddTransaction
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
