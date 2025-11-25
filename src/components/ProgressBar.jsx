import { CheckCircle, Clock, Target } from "lucide-react";

export default function ProgressBar({
  tasks = [],
  className = "",
  showDetails = true,
  size = "default",
}) {
  // Calculate progress metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Determine progress status
  const getProgressStatus = () => {
    if (totalTasks === 0)
      return { status: "empty", color: "slate", message: "No tasks yet" };
    if (progressPercentage === 100)
      return { status: "complete", color: "green", message: "Completed!" };
    if (progressPercentage >= 75)
      return { status: "near-complete", color: "blue", message: "Almost done" };
    if (progressPercentage >= 50)
      return {
        status: "in-progress",
        color: "indigo",
        message: "Making progress",
      };
    if (progressPercentage >= 25)
      return { status: "started", color: "purple", message: "Getting started" };
    return { status: "just-started", color: "slate", message: "Just started" };
  };

  const { status, color, message } = getProgressStatus();

  // Size variants
  const sizeClasses = {
    small: "h-1.5",
    default: "h-3",
    large: "h-4",
  };

  // Color variants
  const colorClasses = {
    green: "bg-green-600",
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    slate: "bg-stone-500",
  };

  const backgroundClasses = {
    green: "bg-green-50 border-green-200",
    blue: "bg-blue-50 border-blue-200",
    indigo: "bg-indigo-50 border-indigo-200",
    purple: "bg-purple-50 border-purple-200",
    slate: "bg-stone-50 border-stone-200",
  };

  const textClasses = {
    green: "text-green-700",
    blue: "text-blue-700",
    indigo: "text-indigo-700",
    purple: "text-purple-700",
    slate: "text-slate-700",
  };

  const iconClasses = {
    green: "text-green-600",
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    purple: "text-purple-600",
    slate: "text-slate-600",
  };

  return (
    <div className={`${className}`}>
      {showDetails && (
        <div
          className={`flex items-center justify-between mb-2`}
        >
          <div className="flex items-center gap-2">
            <span className={`font-semibold text-sm text-stone-700`}>
              Project Progress
            </span>
            <span className="text-sm text-stone-500">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <span className="text-xs text-stone-500">
            {completedTasks} of {totalTasks} tasks completed
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        <div
          className={`w-full bg-stone-100 rounded-full ${sizeClasses[size]} overflow-hidden`}
        >
          <div
            className={`${sizeClasses[size]} rounded-full ${colorClasses[color]} transition-all duration-500 ease-out`}
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>

      {/* Task breakdown (for large size) */}
      {showDetails && size === "large" && totalTasks > 0 && (
        <div className="flex items-center justify-center gap-6 mt-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-600">{completedTasks} Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <span className="text-slate-600">{pendingTasks} Pending</span>
          </div>
        </div>
      )}
    </div>
  );
}
