import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
]


const BuildControls = (props) => {
    return (
        <div className='BuildControls'>
            <p> Current price: <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map((ctrl) => {
                return <BuildControl 
                removed={() => props.ingredientRemove(ctrl.type)} 
                added={() => props.ingredientAdded(ctrl.type) } 
                key={ctrl.label} 
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]}/>
            })}
            <button className='OrderButton' disabled={!props.purchaseable} onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
};

export default BuildControls;