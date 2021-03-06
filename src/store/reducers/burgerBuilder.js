import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
        const updateIngredients = updateObject(state.ingredients,  { [action.ingredientName]: state.ingredients[action.ingredientName] + 1})
        const updatedState = {
            ingredients:updateIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
        }
        return updateObject(state, updatedState);
        
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 0
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }


}

export default reducer;