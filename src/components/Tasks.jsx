import NewTask from "./NewTask";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
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

  return (
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
              className={`text-sm font-normal px-2 py-1 rounded-full ${
                isAllCompleted
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
      <div className="flex-1 overflow-auto">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-orange-400" />
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
                className={`task-item group transition-all duration-200 ${
                  task.completed ? "opacity-75" : "opacity-100"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => onToggle(task.id)}
                        className={`w-5 h-5 border-2 rounded mt-0.5 flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                          task.completed
                            ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
                            : "border-orange-300 hover:border-orange-400 text-orange-400 hover:bg-orange-50"
                        }`}
                      >
                        {task.completed ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p
                          className={`leading-relaxed break-words transition-all duration-300 ${
                            task.completed
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
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckSquare className="w-3 h-3" />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => onDelete(task.id)}
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                  >
                    <span className="sr-only">Delete task</span>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
