import React from 'react';

import './Order.css';

const Order = (props) => {

    const ingredients = [];
    for(let ingredient in props.ingredients) {
        ingredients.push({name:ingredient, amount:props.ingredients[ingredient]})
    }

    const ingredientOutput = ingredients.map((ig) => {
        return <span key={ig.name}>{ig.name}({ig.amount})</span>
    })
    return (
        <div className="Order">
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: USD {props.price.toFixed(2)}</p>
        </div>
    );
};

export default Order;