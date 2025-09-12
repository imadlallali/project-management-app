import SideBar from "./components/SideBar.jsx";
import NewProject from "./components/NewProject.jsx";   
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

function App() {
  const [projectsState , setProjectsState] = useState({
    selectedProject: undefined,
    projects: []
  });

function handleStartAddProject(){
  setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProject: null,
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



let content;
if (projectsState.selectedProject === null) {
  content = <NewProject onAdd={handleAddProject}/>; }
  else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }




  return (
    <main className="h-screen my-8 flex gap-8">
    <SideBar onStartAddProject={handleStartAddProject} />
    {content}
    </main>
  );
}

export default App;
