import { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Todo from "./components/Todo";

function App () {
    // 커밋왜안됨? 커밋왜안됨? 커밋왜안됨?
    const [tasks, setTasks] = useState([]);
    const [taskFilter, setTaskFilter] = useState("All");

    const FILTER = {
        All: () => true,
        Active: task => !task.completed,
        Completed: task => task.completed
    }

    function addTask (name) {
        setTasks([...tasks, {id: "task-" + nanoid(), name: name, completed: false}]);
    }

    function deleteTask (id) {
        const newTasks = tasks.filter(task => id !== task.id);
        setTasks(newTasks);
    }

    function updateTask (id, name) {
        const newTask = tasks.map(task => {
            if (id === task.id) return {...task, name: name}
            return task;
        });
        setTasks(newTask);
    }

    function toggleCompleted (id) {
        const newTasks = tasks.map(task => {
            if (id === task.id) return {...task, completed: !task.completed}
            return task;
        });
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <h3>What needs to be done?</h3>
            <Form addTask={addTask}/>
            <Filter updateFilter={setTaskFilter}/>

            <h3>{tasks.length} {tasks.length > 1 ? 'tasks' : 'task'} remaining</h3>

            <ul>
                {tasks
                    .filter(FILTER[taskFilter])
                    .map((task, idx) =>
                    <Todo
                        name={task.name}
                        id={task.id}
                        completed={task.completed}
                        key={idx}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                    />
                )}
            </ul>
        </div>
    );
}

export default App;
