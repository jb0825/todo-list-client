import React from "react";

export default function Filter (props) {
    function handleClick (e) { props.updateFilter(e.target.textContent); }

    return (
        <>
            <button type="button" onClick={handleClick}>All</button>
            <button type="button" onClick={handleClick}>Active</button>
            <button type="button" onClick={handleClick}>Completed</button>
        </>
    );
}