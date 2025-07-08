export default function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-gray-800 p-4 rounded shadow mt-6">
      <h3 className="text-xl font-semibold mb-4">📈 Productivity Stats</h3>
      <ul className="space-y-2">
        <li>Total Tasks: <span className="text-blue-400">{total}</span></li>
        <li>Completed: <span className="text-green-400">{completed}</span></li>
        <li>Active: <span className="text-yellow-400">{active}</span></li>
        <li>Completion Rate: <span className="text-purple-400">{completionRate}%</span></li>
      </ul>
    </div>
  );
}
