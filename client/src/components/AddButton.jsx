import React from 'react'

function AddButton(props) {
    return (
        <button className="customButton">
            {props.name}
        </button>
    )
}

export default AddButton
