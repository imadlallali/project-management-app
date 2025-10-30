import SideBar from "./components/SideBar.jsx";
import NewProject from "./components/NewProject.jsx";
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProjects.jsx";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { CheckCircle, Trash2, Clock } from "lucide-react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const TaskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProject,
        id: TaskId,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });

    toast.success("Task added successfully!", {
      icon: <CheckCircle className="w-4 h-4" />,
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => task.id !== taskId);

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });

    toast.success("Task deleted successfully!", {
      icon: <Trash2 className="w-4 h-4" />,
    });
  }

  function handleToggleTask(taskId) {
    let taskBeforeToggle;
    setProjectsState((prevState) => {
      taskBeforeToggle = prevState.tasks.find((t) => t.id === taskId);
      const updatedTasks = prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });

    if (taskBeforeToggle) {
      toast.success(
        taskBeforeToggle.completed
          ? "Task marked as pending!"
          : "Task completed!",
        {
          icon: taskBeforeToggle.completed ? (
            <Clock className="w-4 h-4" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          ),
        }
      );
    }
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject(projectId) {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects.filter(
        (project) => project.id !== projectId
      );
      const updatedTasks = prevState.tasks.filter(
        (task) => task.projectId !== projectId
      );

      return {
        ...prevState,
        projects: updatedProjects,
        tasks: updatedTasks,
        selectedProject: undefined,
      };
    });

    toast.success("Project deleted successfully!", {
      icon: <Trash2 className="w-4 h-4" />,
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProject
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onToggleTask={handleToggleTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProject === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto h-[calc(100vh-3rem)] flex gap-6 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
        <SideBar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProject}
          tasks={projectsState.tasks}
        />
        <div className="flex-1 glass-card p-8 overflow-auto">{content}</div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            color: "#334155",
            border: "1px solid rgba(203, 213, 225, 0.3)",
            borderRadius: "12px",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </main>
  );
}

export default App;
