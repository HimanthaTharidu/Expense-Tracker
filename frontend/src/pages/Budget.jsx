const categories = [
  { name: 'Housing', spent: 820, budget: 1000 },
  { name: 'Food', spent: 420, budget: 500 },
  { name: 'Transport', spent: 180, budget: 250 },
  { name: 'Entertainment', spent: 140, budget: 300 },
];

const Budget = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">Planning</p>
        <h1 className="text-3xl font-bold text-gray-900">Budget</h1>
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const progress = Math.min((category.spent / category.budget) * 100, 100);

          return (
            <div key={category.name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">{category.name}</h2>
                <span className="text-sm font-medium text-gray-600">${category.spent.toFixed(2)} / ${category.budget.toFixed(2)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${progress >= 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;
