import {useState} from "react";
import axios from "axios";
import Form from "./components/Form";
import Filter from "./components/Filter";
import TodoList from "./components/TodoList";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskFilter, setTaskFilter] = useState("All");

    function getTasks() {
        axios.get("/tasks")
            .then((resp) => {
                let data = [];
                resp.data.map(d => data.push(d))
                setTasks([...data]);
            })
            .catch((err) => {
                console.log(err);
                setTasks([]);
            });
    }

    function addTask(name) {
        axios.post("/task", {name})
            .then(() => { getTasks() })
            .catch((err) => { console.log(err) })
    }

    function deleteTask(id) {
        axios.delete(`/task/${id}`)
            .then(() => { getTasks() })
            .catch((err) => { console.log(err) });
    }

    function updateTask(id, name, completed) {
        axios.patch(`/task/${id}`, {name, completed})
            .then(() => { getTasks() })
            .catch((err) => { console.log(err) });
    }

    return (
        <div className="App">
            <h3>What needs to be done?</h3>
            <Form addTask={addTask}/>
            <Filter updateFilter={setTaskFilter}/>

            <h3>{tasks.length} {tasks.length > 1 ? 'tasks' : 'task'} remaining</h3>

            <TodoList
                tasks={tasks}
                taskFilter={taskFilter}
                getTasks={getTasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        </div>
    );
}

export default App;
