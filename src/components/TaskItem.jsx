export default function TaskItem({ task, onToggle }) {
  return (
    <li
      className={`cursor-pointer p-2 border rounded ${
        task.done ? "line-through text-gray-400" : ""
      }`}
      onClick={onToggle}
    >
      {task.text}
    </li>
  );
}
