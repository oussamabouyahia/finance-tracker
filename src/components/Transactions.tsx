import type { Transaction } from "../mockData";
interface TransactionProps {
  transactions: Transaction[];
}
const Transactions = ({ transactions }: TransactionProps) => {
  return (
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
  );
};

export default Transactions;
