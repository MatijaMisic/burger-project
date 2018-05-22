import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
    .map((igKey) => {
        return (<li key={igKey}><span className='orderSummury'>{igKey}</span>:{props.ingredients[igKey]}</li>)
    })
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Delicios burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total price: {props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

export default OrderSummary;