const expenses = [
  { id: 1, name: 'Groceries', category: 'Food', amount: 72.4, date: '2026-10-18' },
  { id: 2, name: 'Fuel', category: 'Transport', amount: 48.0, date: '2026-10-15' },
  { id: 3, name: 'Electricity', category: 'Bills', amount: 92.75, date: '2026-10-12' },
];

const Expenses = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Transactions</p>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
        </div>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Add expense
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.category}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">-${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
