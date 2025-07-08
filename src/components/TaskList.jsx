import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import Stats from "./Stats";


export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // ⬇ Load tasks from LocalStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem("focusflow-tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // ⬆ Save tasks to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("focusflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div>
      <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-lime-500 text-white rounded shadow hover:from-green-500 hover:to-lime-600 transition-all">
        <input
          type="text"
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 text-black rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="px-4 bg-green-600 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} onToggle={() => toggleTask(index)} />
        ))}
      </ul>
		<Stats tasks={tasks} />

    </div>
  );
}
