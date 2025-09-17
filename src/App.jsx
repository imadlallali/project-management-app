import SideBar from "./components/SideBar.jsx";
import NewProject from "./components/NewProject.jsx";   
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProjects.jsx";

function App() {
  const [projectsState , setProjectsState] = useState({
    selectedProject: undefined,
    projects: []
  });

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

function handleStartAddProject(){
  setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProject: null,
    };
  });
}

function handleCancelAddProject(){
    setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProject: undefined,
    };
  });
  }


function handleAddProject(projectData){
  setProjectsState(prevState => {
    const newProject = {
      ...projectData,
      id: Math.random()
    }
    return {
      ...prevState,
      projects: [...prevState.projects, newProject]
    };
  })
}

let selectedProject = projectsState.projects.find(project => 
     project.id === projectsState.selectedProject
  );

let content = <SelectedProject project={selectedProject}/>;
if (projectsState.selectedProject === null) {
  content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>; }
  else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }




  return (
    <main className="h-screen my-8 flex gap-8">
    <SideBar
    onStartAddProject={handleStartAddProject}
    projects={projectsState.projects}
    onSelectProject={handleSelectProject}/>
    {content}
    </main>
  );
}

export default App;
