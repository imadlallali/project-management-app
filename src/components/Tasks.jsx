import NewTask from './NewTask';

export default function Tasks({tasks, onAdd, onDelete}) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onAdd={onAdd} />
            {tasks.length === 0 && <p className="text-stone-700 my-4 ">This project does not have any tasks yet</p>}
            {tasks.length > 0 && <ul className="pt-2 mt-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between my-4 border border-stone-200 px-3 py-2 rounded-md bg-stone-100">
                        <span className="mt-">{task.text}</span>
                        <button 
                        className='text-stone-700 hover:text-stone-500'
                        onClick={() => onDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>}
        </section>
    );
}