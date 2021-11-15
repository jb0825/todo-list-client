import React, { useState } from "react";

export default function Todo (props) {
    const [newName, setNewName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const id = props.id;

    function handleChange (e) { setNewName(e.target.value) }

    function handleSubmit (e) {
        e.preventDefault();
        props.updateTask(props.id, newName);
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
                defaultChecked={props.completed}
                onChange={() => props.toggleCompleted(id)}
            />
            <label>{props.name}</label>
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