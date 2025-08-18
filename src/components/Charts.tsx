import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import type { Transaction } from "../mockData";
const COLORS = ["#f87171", "#facc15", "#4ade80", "#60a5fa", "#f472b6"];
interface ChartsProps {
  transactions: Transaction[];
}
const Charts = ({ transactions }: ChartsProps) => {
  const categoryData = useMemo(() => {
    const grouped: { [key: string]: number } = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        grouped[t.category] = (grouped[t.category] || 0) + t.amount;
      }
    });
    return Object.entries(grouped).map(([cat, value]) => ({
      name: cat,
      value,
    }));
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const grouped: { [key: string]: number } = {};
    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      });
      grouped[month] =
        (grouped[month] || 0) + (t.type === "expense" ? t.amount : 0);
    });
    return Object.entries(grouped).map(([month, value]) => ({
      month,
      expense: value,
    }));
  }, [transactions]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className=" p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expense" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
