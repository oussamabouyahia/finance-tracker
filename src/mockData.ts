export interface Transaction {
  id?: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "income",
    category: "Salary",
    amount: 2000,
    date: "2025-08-01",
  },
  { id: 2, type: "expense", category: "Food", amount: 150, date: "2025-08-02" },
  {
    id: 3,
    type: "expense",
    category: "Transport",
    amount: 50,
    date: "2025-08-03",
  },
];
