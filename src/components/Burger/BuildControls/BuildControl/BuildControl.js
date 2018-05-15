import React from 'react';
import './BuildControl.css'
const BuildControl = (props) => {
    console.log(props.disabled);
    return (
        
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button className="Less" onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className="More" onClick={props.added}>More</button>
        </div>
    );
};

export default BuildControl;