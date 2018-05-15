import React, { Component } from "react";
import "./BurgerBuilder.css";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummury from "../../components/Burger/OrderSummary/OrderSummury";

const ingredientPrices = {
  salad:0.5,
  cheese: 0.4,
  meat:1.3,
  bacon:0.7
}
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice:0,
      purchaseable: false,
      purchasing: false
    };
  }

  updatePurchase = (ingredients) => {

    const sum = Object.keys(ingredients).map((ingKey) => {
      return ingredients[ingKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    this.setState({purchaseable: sum > 0})
  }
  addIngredientHandler = (type) => {
    
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = this.state.totalPrice + ingredientPrices[type];

    this.setState({totalPrice: priceAddition, ingredients:updatedIngredients})   
    this.updatePurchase(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = this.state.totalPrice - ingredientPrices[type];

    this.setState({totalPrice: priceDeduction, ingredients:updatedIngredients})
    this.updatePurchase(updatedIngredients);
  }

  purchaseHandle = (params) => {
    this.setState({purchasing:true})  
  }

  closedModalHandler = () => {
    this.setState({purchasing:false})  
  }

  purchaseContinueHandler = () => {
    console.log('tyou continue');
    
  }
  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }
    
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0      
    }

    return (
      <div className="content">
        <Modal show={this.state.purchasing} modalClosed={this.closedModalHandler}>
          <OrderSummury 
          purchaseCanceled={this.closedModalHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients = {this.state.ingredients} />
        <BuildControls 
        ingredientAdded = {this.addIngredientHandler} 
        ingredientRemove={this.removeIngredientHandler}
        disabled = {disabledInfo}
        price = {this.state.totalPrice}
        purchaseable = {this.state.purchaseable}
        ordered={this.purchaseHandle}
        />
      </div>
    );
  }
}

export default BurgerBuilder;
