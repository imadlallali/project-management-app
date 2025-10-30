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
    <aside className="w-80 sidebar-glass text-white p-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center icon-glow">
            <FolderKanban className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">Project Manager</h1>
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
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ease-out ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 text-white shadow-lg"
                        : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-slate-600/30"
                    }`}
                    onClick={() => onSelectProject(project.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Circle
                        className={`w-2 h-2 ${
                          isSelected
                            ? "text-indigo-400 fill-current"
                            : "text-slate-600"
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
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>
                                {completedTasks.length}/{projectTasks.length}{" "}
                                tasks
                              </span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                          </div>
                        )}
                        {project.dueDate && (
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Due:{" "}
                            {new Date(project.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
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
      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <p className="text-xs text-slate-400 text-center">
          Manage your projects efficiently
        </p>
      </div>
    </aside>
  );
}
