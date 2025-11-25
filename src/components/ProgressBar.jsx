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
    green: "from-green-500 to-emerald-600",
    blue: "from-blue-500 to-cyan-600",
    indigo: "from-indigo-500 to-purple-600",
    purple: "from-purple-500 to-pink-600",
    slate: "from-slate-400 to-slate-500",
  };

  const backgroundClasses = {
    green: "bg-green-50 border-green-200",
    blue: "bg-blue-50 border-blue-200",
    indigo: "bg-indigo-50 border-indigo-200",
    purple: "bg-purple-50 border-purple-200",
    slate: "bg-slate-50 border-slate-200",
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
          className={`px-4 py-3 rounded-lg border ${backgroundClasses[color]} mb-3`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {status === "complete" ? (
                <CheckCircle className={`w-4 h-4 ${iconClasses[color]}`} />
              ) : status === "empty" ? (
                <Target className={`w-4 h-4 ${iconClasses[color]}`} />
              ) : (
                <Clock className={`w-4 h-4 ${iconClasses[color]}`} />
              )}
              <span className={`font-semibold text-sm ${textClasses[color]}`}>
                Project Progress
              </span>
            </div>
            <span className={`text-sm font-bold ${textClasses[color]}`}>
              {progressPercentage}%
            </span>
          </div>

          <div className="flex items-center justify-between text-xs mb-2">
            <span className={textClasses[color]}>{message}</span>
            <span className="text-slate-500">
              {completedTasks} of {totalTasks} tasks completed
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        <div
          className={`w-full bg-slate-200 rounded-full ${sizeClasses[size]} overflow-hidden`}
        >
          <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-700 ease-out`}
            style={{
              width: `${progressPercentage}%`,
              boxShadow:
                progressPercentage > 0
                  ? "0 0 10px rgba(99, 102, 241, 0.3)"
                  : "none",
            }}
          />
        </div>

        {/* Progress indicator dot */}
        {progressPercentage > 0 && progressPercentage < 100 && (
          <div
            className={`absolute top-1/2 w-2 h-2 bg-white rounded-full shadow-md transform -translate-y-1/2 transition-all duration-700 ease-out`}
            style={{ left: `calc(${progressPercentage}% - 4px)` }}
          />
        )}
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
