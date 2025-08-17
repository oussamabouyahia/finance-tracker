import { useState, useMemo } from "react";
import { mockTransactions, type Transaction } from "../mockData";
export default function useTransaction() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    description: "",
  });
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

  // Calculate income, expenses, and balance
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

  return {
    transactions,
    form,
    setForm,
    handleSubmit,
    balance,
    income,
    expenses,
  };
}
