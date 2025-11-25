import NewTask from "./NewTask";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import { useState } from "react";
import {
  CheckSquare,
  Square,
  Trash2,
  ListTodo,
  FileText,
  Trophy,
} from "lucide-react";

export default function Tasks({
  tasks = [],
  onAdd,
  onDelete,
  onToggle,
  projectId,
}) {
  const completedTasks = tasks.filter((task) => task.completed);
  const isAllCompleted =
    tasks.length > 0 && completedTasks.length === tasks.length;

  const [taskToDelete, setTaskToDelete] = useState(null);

  function handleDeleteClick(taskId) {
    setTaskToDelete(taskId);
  }

  function handleCancelDelete() {
    setTaskToDelete(null);
  }

  function handleConfirmDelete() {
    if (taskToDelete) {
      onDelete(taskToDelete);
      setTaskToDelete(null);
    }
  }

  return (
    <>
      <Modal open={taskToDelete !== null} onClose={handleCancelDelete} actions={
        <>
          <Button onClick={handleCancelDelete} variant="text" className="text-slate-500 hover:text-slate-700">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="danger">
            Delete Task
          </Button>
        </>
      }>
        <h2 className="text-xl font-bold text-slate-700 mb-4">Delete Task?</h2>
        <p className="text-slate-600 mb-4">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
      </Modal>
      <section className="h-full flex flex-col">
        {/* Tasks Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-700 flex items-center gap-3">
            {isAllCompleted && tasks.length > 0 ? (
              <Trophy className="w-6 h-6 text-yellow-500" />
            ) : (
              <ListTodo className="w-6 h-6" />
            )}
            Tasks
            {tasks.length > 0 && (
              <span
                className={`text-sm font-normal px-2 py-1 rounded-full ${isAllCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
                  }`}
              >
                {tasks.length}
              </span>
            )}
          </h2>
          {tasks.length > 0 && (
            <div className="text-sm text-slate-500 text-right">
              <div className="font-medium">
                {completedTasks.length} of {tasks.length} completed
              </div>
              {isAllCompleted && (
                <div className="text-green-600 text-xs font-medium mt-1 flex items-center gap-1">
                  <CheckSquare className="w-3 h-3" />
                  All tasks completed!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Progress Overview */}
        {tasks.length > 0 && (
          <div className="mb-6">
            <ProgressBar tasks={tasks} size="default" showDetails={false} />
          </div>
        )}

        {/* Add New Task */}
        <div className="mb-6">
          <NewTask onAdd={onAdd} />
        </div>

        {/* Tasks List */}
        <div className="flex-1 overflow-visible md:overflow-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
                <FileText className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500 mb-2">No tasks yet</p>
              <p className="text-sm text-slate-400">
                Add your first task to get started!
              </p>
            </div>
          ) : (
            <ul className="space-y-3 pb-4">
              {tasks.map((task, index) => (
                <li
                  key={task.id}
                  className={`task-item group transition-all duration-300 ${task.completed
                    ? "opacity-75 transform scale-[0.98]"
                    : "opacity-100 transform scale-100"
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggle(task.id)}
                          className={`w-5 h-5 border-2 rounded mt-0.5 flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 ${task.completed
                            ? "bg-green-500 border-green-500 text-white hover:bg-green-600 shadow-md"
                            : "border-slate-300 hover:border-indigo-400 text-slate-400 hover:bg-indigo-50"
                            }`}
                        >
                          {task.completed ? (
                            <CheckSquare className="w-4 h-4 animate-in zoom-in duration-200" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p
                            className={`leading-relaxed break-words transition-all duration-300 ${task.completed
                              ? "line-through text-slate-500"
                              : "text-slate-700"
                              }`}
                          >
                            {task.text}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400">
                              Created{" "}
                              {new Date(
                                task.createdAt || new Date()
                              ).toLocaleDateString()}
                            </span>
                            {task.completed && (
                              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full animate-in slide-in-from-right duration-300 flex items-center gap-1">
                                <CheckSquare className="w-3 h-3" />
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeleteClick(task.id)}
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50 p-2 transform hover:scale-105"
                    >
                      <span className="sr-only">Delete task</span>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {/* Progress celebration effect for completed tasks */}
                  {task.completed && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-full bg-gradient-to-r from-green-100/30 to-emerald-100/30 rounded-lg animate-pulse"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
