import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const stats = [
  { label: 'Total balance', value: '$4,280.00', tone: 'emerald' },
  { label: 'Monthly spend', value: '$1,240.00', tone: 'blue' },
  { label: 'Budget left', value: '$760.00', tone: 'amber' },
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Overview</p>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'there'}!</h1>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`mt-3 text-3xl font-bold text-${stat.tone}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>Groceries</span>
              <span className="font-medium text-gray-900">-$72.40</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>Salary</span>
              <span className="font-medium text-emerald-600">+$2,600.00</span>
            </li>
            <li className="flex justify-between">
              <span>Utility bills</span>
              <span className="font-medium text-gray-900">-$118.25</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Budget health</h2>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-3/4 rounded-full bg-indigo-600" />
          </div>
          <p className="mt-3 text-sm text-gray-600">76% of your monthly budget has been used.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
