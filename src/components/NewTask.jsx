import { useState } from "react";
import Button from "./Button";
import { Plus, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function NewTask({ onAdd }) {
  const [task, setTask] = useState("");

  function handleTaskChange(event) {
    setTask(event.target.value);
  }

  function handleAddTask() {
    if (task.trim() === "") {
      toast.error("Please enter a task description!", {
        icon: <AlertTriangle className="w-4 h-4" />,
      });
      return;
    }
    onAdd(task);
    setTask("");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            className="input-field"
            placeholder="What needs to be done?"
            onChange={handleTaskChange}
            onKeyPress={handleKeyPress}
            value={task}
          />
        </div>
        <Button
          onClick={handleAddTask}
          variant="primary"
          className="px-4 py-3 whitespace-nowrap"
          disabled={task.trim() === ""}
        >
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Task
          </span>
        </Button>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Press Enter or click "Add Task" to create a new task
      </p>
    </div>
  );
}
