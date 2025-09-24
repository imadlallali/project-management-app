import { useState } from "react";

export default function NewTask({ onAdd }) {

    const [Task, setTask] = useState('');

    function handleTaskChange(event) {
        setTask(event.target.value);
    }

    function handleAddTask(){
        if (Task.trim() === '') return;
        onAdd(Task);
        setTask('');
    }

    return (
       <div className="flex items-center gap-4">
        <input
         type="text"
         className="w-64 px-2 py-1 rounded-sm bg-stone-200"
         onChange={handleTaskChange}
         value={Task}
       />
        <button
         className="text-stone-800 hover:text-stone-950"
        onClick={handleAddTask}
         >Add Task</button>
       </div>
    );
}