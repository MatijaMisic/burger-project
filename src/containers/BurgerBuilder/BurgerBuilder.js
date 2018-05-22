import React, { Component, Fragment } from "react";
import "./BurgerBuilder.css";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axiosOrders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/Burger/withErrorHandler/withErrorHandler";

const ingredientPrices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 0,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then((res) => {
        this.setState({ ingredients: res.data })
      }).catch((error) => {
        this.setState({error: true})
      });
  }

  updatePurchase = (ingredients) => {

    const sum = Object.keys(ingredients).map((ingKey) => {
      return ingredients[ingKey]
    })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    this.setState({ purchaseable: sum > 0 })
  }
  addIngredientHandler = (type) => {

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = this.state.totalPrice + ingredientPrices[type];

    this.setState({ totalPrice: priceAddition, ingredients: updatedIngredients })
    this.updatePurchase(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = this.state.totalPrice - ingredientPrices[type];

    this.setState({ totalPrice: priceDeduction, ingredients: updatedIngredients })
    this.updatePurchase(updatedIngredients);
  }

  purchaseHandle = (params) => {
    this.setState({ purchasing: true })
  }

  closedModalHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
   
          const queryParams = [];
          for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
          }
          queryParams.push('price=' + this.state.totalPrice);
          const queryString = queryParams.join('&');
          this.props.history.push({
            pathname:'/checkout',
            search:queryString
          })
  }
  render() {
    console.log(this.state.purchasing);


    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredinents cant be loaded</p> : <Spinner />

    

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandle}
          />
        </Fragment>
      )

      orderSummary = (<OrderSummary
        purchaseCanceled={this.closedModalHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
      />)
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <div className="content">
        <Modal show={this.state.purchasing} modalClosed={this.closedModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
