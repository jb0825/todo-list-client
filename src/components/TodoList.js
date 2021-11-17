import React, {useEffect} from "react";
import Todo from "./Todo";

export default function TodoList (props) {
    const FILTER = {
        All: () => true,
        Active: task => !task.completed,
        Completed: task => task.completed
    }

    useEffect(() => {
        console.log("TodoList Component Mount")
        props.getTasks();
    },[props.taskFilter]);

    return (
        <ul>{
            props.tasks
                .filter(FILTER[props.taskFilter])
                .map((task, idx) =>
                <Todo
                    name={task.name}
                    id={task.id}
                    completed={task.completed}
                    key={idx}
                    updateTask={props.updateTask}
                    deleteTask={props.deleteTask}
                    toggleCompleted={props.toggleCompleted}
                />
            )
        }</ul>
    );
}