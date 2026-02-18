import { useState } from "react";

function NewTasks({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(e) {
    setEnteredTask(e.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") return;
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        onChange={handleChange}
        type="text"
        value={enteredTask}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        className="text-stone-700 hover:text-rose-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}

export default NewTasks;
