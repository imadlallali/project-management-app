import Button from "./Button";
import { FolderKanban, Plus, Folder, Clock, Circle } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function SideBar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
  tasks = [],
}) {
  return (
    <aside className="w-full md:w-80 sidebar-glass text-white p-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-stone-200" />
          </div>
          <h1 className="text-xl font-bold text-stone-100">Project Manager</h1>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg text-slate-200">
            Your Projects
          </h2>
          <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
            {projects.length}
          </span>
        </div>

        <Button onClick={onStartAddProject} className="w-full btn-primary">
          <span className="flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </span>
        </Button>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-hidden">
        <ul className="space-y-2 h-full overflow-y-auto custom-scrollbar pr-2">
          {projects.length === 0 ? (
            <li className="text-center py-8 text-slate-400">
              <div className="mb-3 opacity-50">
                <Folder className="w-8 h-8 mx-auto" />
              </div>
              <p className="text-sm">No projects yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Create your first project to get started
              </p>
            </li>
          ) : (
            projects.map((project) => {
              const isSelected = project.id === selectedProjectId;
              const projectTasks = tasks
                ? tasks.filter((task) => task.projectId === project.id)
                : [];
              const completedTasks = projectTasks.filter(
                (task) => task.completed
              );
              const progress =
                projectTasks.length > 0
                  ? (completedTasks.length / projectTasks.length) * 100
                  : 0;

              return (
                <li key={project.id} className="project-card">
                  <button
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 ease-out ${isSelected
                      ? "bg-stone-800 text-white shadow-sm"
                      : "text-stone-400 hover:bg-stone-800/50 hover:text-stone-200"
                      }`}
                    onClick={() => onSelectProject(project.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Circle
                        className={`w-2 h-2 ${isSelected
                          ? "text-stone-200 fill-current"
                          : "text-stone-600"
                          }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{project.title}</p>
                        {projectTasks.length > 0 && (
                          <div className="mt-2">
                            <ProgressBar
                              tasks={projectTasks}
                              size="small"
                              showDetails={false}
                              className="mb-1"
                            />
                            <div className="flex items-center justify-between text-xs text-stone-500">
                              <span>
                                {completedTasks.length}/{projectTasks.length}{" "}
                                tasks
                              </span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                          </div>
                        )}
                        {project.dueDate && (
                          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Due:{" "}
                            {new Date(project.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 bg-stone-400 rounded-full"></div>
                      )}
                    </div>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-stone-800">
        <p className="text-xs text-stone-500 text-center">
          Manage your projects efficiently
        </p>
      </div>
    </aside>
  );
}
