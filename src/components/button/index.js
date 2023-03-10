import React from 'react'

import "./index.css"

function Button(props) {
    const { label, clickHandler } = props;
    const isOperator = isNaN(label) && label != ".";

    return (
        <div
            className={`button-container ${isOperator ? "operator" : "digit"}`}
            onClick={() => label.length > 0 ? clickHandler(label, isOperator) : undefined}
        >
            <h2 className="button-label">{label}</h2>
        </div>
    )
}

export default Button;