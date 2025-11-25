import Tasks from "./Tasks";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import { useState } from "react";
import {
  Trash2,
  AlertCircle,
  Clock,
  Calendar,
  FileText,
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

  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeleteClick() {
    setIsDeleting(true);
  }

  function handleCancelDelete() {
    setIsDeleting(false);
  }

  function handleConfirmDelete() {
    onDelete(project.id);
    setIsDeleting(false);
  }

  return (
    <>
      <Modal open={isDeleting} onClose={handleCancelDelete} actions={
        <>
          <Button onClick={handleCancelDelete} variant="text" className="text-stone-500 hover:text-stone-700">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="danger">
            Delete Project
          </Button>
        </>
      }>
        <h2 className="text-xl font-bold text-stone-700 mb-4">Delete Project?</h2>
        <p className="text-stone-600 mb-4">
          Are you sure you want to delete <span className="font-semibold text-stone-800">{project.title}</span>?
          This action cannot be undone and will remove all associated tasks.
        </p>
      </Modal>
      <div className="h-full flex flex-col">
        {/* Project Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-stone-800 mb-3">
                {project.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${isOverdue
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : isUrgent
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "bg-stone-100 text-stone-700 border border-stone-200"
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
                      ? `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? "s" : ""
                      }`
                      : daysUntilDue === 0
                        ? "Due today"
                        : `${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""
                        } left`}
                  </span>
                </div>
                <div className="text-sm text-stone-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due: {formattedDate}
                </div>
              </div>
            </div>
            <Button
              onClick={handleDeleteClick}
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
          <div className="mb-6 border-b border-stone-200 pb-6">
            <ProgressBar tasks={projectTasks} size="large" showDetails={true} />
          </div>

          {/* Description */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Project Description
            </h3>
            <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        </header>

        {/* Tasks Section */}
        <div className="flex-1">
          <Tasks
            onAdd={onAddTask}
            onDelete={onDeleteTask}
            onToggle={onToggleTask}
            tasks={projectTasks}
            projectId={project.id}
          />
        </div>
      </div>
    </>
  );
}
