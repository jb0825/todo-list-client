import React, {useEffect, useState} from "react";

export default function Todo (props) {
    const [newName, setNewName] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const id        = props.id;
    const name      = props.name;
    const completed = props.completed;

    useEffect(() => {
        console.log("Todo Component Mount")
    },[])

    function handleChange (e) { setNewName(e.target.value) }

    function handleSubmit (e) {
        e.preventDefault();
        props.updateTask(props.id, newName, completed);
        setNewName("")
        setIsEditing(false);
    }

    const editTemplate = (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="enter new task"
                value={newName}
                onChange={handleChange}
            />
            <span>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit">Save</button>
            </span>
        </form>
    );

    const viewTemplate = (
        <div>
            <input
                type="checkbox"
                checked={completed}
                onChange={(e) => props.updateTask(id, name, e.target.checked)}
            />
            <label>{name}</label>
            <div>
                <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                <button type="button" onClick={() => props.deleteTask(id)}>Delete</button>
            </div>
        </div>
    );

    return (
        <li>
            {isEditing ? editTemplate : viewTemplate}
        </li>
    );
}