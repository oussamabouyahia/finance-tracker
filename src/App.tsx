// App.tsx
import CardsSummary from "./components/CardsSummary";
import Charts from "./components/Charts";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import useTransaction from "./hooks/usetransaction";

function App() {
  const {
    transactions,
    form,
    setForm,
    handleSubmit,
    balance,
    income,
    expenses,
  } = useTransaction();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 ">
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
