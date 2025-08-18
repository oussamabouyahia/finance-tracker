interface CardsSummary {
  balance: number;
  income: number;
  expenses: number;
}

const CardsSummary = ({ balance, income, expenses }: CardsSummary) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center ">
      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-lg font-semibold">Balance</h2>
        <p className="text-2xl font-bold">${balance}</p>
      </div>
      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-lg font-semibold">Income</h2>
        <p className="text-2xl font-bold text-green-600">+${income}</p>
      </div>
      <div className="p-4 bg-red-100 rounded-lg">
        <h2 className="text-lg font-semibold">Expenses</h2>
        <p className="text-2xl font-bold text-red-600">-${expenses}</p>
      </div>
    </div>
  );
};

export default CardsSummary;
