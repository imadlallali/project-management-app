import ProjectsList from './NewProject';
import Button from './Button';


export default function SideBar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId
}) {
  return (
      <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
      <Button onClick={onStartAddProject}>
        + Add Project</Button>
      </div>
      <ul className="mt-8 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
        {projects.map(project => {
          let cssClasses = 'px-2 py-1 w-full text-left rounded-sm hover:bg-stone-800 hover:text-stone-200';
          if (project.id === selectedProjectId) {
            cssClasses += ' bg-stone-800 text-stone-200';
          }else {
            cssClasses += ' text-stone-400';
          }

          return (
            <li key={project.id} className="border-b border-stone-700 py-2 last-of-type:border-0">
              <button
              className={cssClasses}
              onClick={() => onSelectProject(project.id)}
              >
              {project.title}
            </button>
          </li>
          );
        })} 
      </ul>
    </aside>
  );

}