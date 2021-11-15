import React, { useState } from "react";

export default function Form (props) {
    const [name, setName] = useState("");

    function handleChange (e) { setName(e.target.value) }
    function handleSubmit (e) {
        e.preventDefault();
        if (name.length !== 0) {
            props.addTask(name);
            setName("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleChange}
                value={name}
            />
            <button type="submit">Add</button>
        </form>
    );
}