import { Button } from "../shared/Button";
import Input from "../shared/Input";

interface NewTransactionForm {
  type: string;
  category: string;
  amount: string;
  date: string;
  description: string;
}

interface newTransactionProps {
  form: NewTransactionForm;
  setForm: React.Dispatch<React.SetStateAction<NewTransactionForm>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const AddTransaction = ({
  handleSubmit,
  form,
  setForm,
}: newTransactionProps) => {
  const disabled = !(
    Number(form.amount) > 0 &&
    (form.type === "expense" || form.type === "income") &&
    form.category &&
    form.date
  );
  return (
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
        <Input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <Input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded col-span-2"
        />

        <Button
          disabled={!disabled}
          type="submit"
          variant={disabled ? "secondary" : "primary"}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddTransaction;
