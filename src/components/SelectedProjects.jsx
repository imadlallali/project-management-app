import Tasks from "./Tasks";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import {
  Trash2,
  AlertCircle,
  Clock,
  Calendar,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  onToggleTask,
  tasks = [],
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const daysUntilDue = Math.ceil(
    (new Date(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isOverdue = daysUntilDue < 0;
  const isUrgent = daysUntilDue <= 3 && daysUntilDue >= 0;

  const projectTasks = tasks
    ? tasks.filter((task) => task.projectId === project.id)
    : [];
  const completedTasks = projectTasks.filter((task) => task.completed);
  const progress =
    projectTasks.length > 0
      ? (completedTasks.length / projectTasks.length) * 100
      : 0;

  return (
    <div className="h-full flex flex-col fade-in">
      {/* Project Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold gradient-text mb-3">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  isOverdue
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : isUrgent
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                {isOverdue ? (
                  <AlertCircle className="w-4 h-4" />
                ) : isUrgent ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Calendar className="w-4 h-4" />
                )}
                <span>
                  {isOverdue
                    ? `Overdue by ${Math.abs(daysUntilDue)} day${
                        Math.abs(daysUntilDue) !== 1 ? "s" : ""
                      }`
                    : daysUntilDue === 0
                    ? "Due today"
                    : `${daysUntilDue} day${
                        daysUntilDue !== 1 ? "s" : ""
                      } left`}
                </span>
              </div>
              <div className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due: {formattedDate}
              </div>
            </div>
          </div>
          <Button
            onClick={() => onDelete(project.id)}
            variant="danger"
            className="ml-4 px-4 py-2"
          >
            <span className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </span>
          </Button>
        </div>

        {/* Progress Section */}
        <div className="glass-card p-6 mb-6">
          <ProgressBar tasks={projectTasks} size="large" showDetails={true} />
        </div>

        {/* Description */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Project Description
          </h3>
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>
      </header>

      {/* Tasks Section */}
      <div className="flex-1 overflow-hidden">
        <Tasks
          onAdd={onAddTask}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
          tasks={projectTasks}
          projectId={project.id}
        />
      </div>
    </div>
  );
}
