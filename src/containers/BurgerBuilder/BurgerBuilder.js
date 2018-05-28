import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./BurgerBuilder.css";
import axios from '../../axiosOrders';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/Burger/withErrorHandler/withErrorHandler";
import * as burgerBilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchase = (ingredients) => {

    const sum = Object.keys(ingredients).map((ingKey) => {
      return ingredients[ingKey]
    })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    return sum > 0;
  }
  
  purchaseHandle = (params) => {
    this.setState({ purchasing: true })
  }

  closedModalHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
          this.props.onInitPurchase();
          this.props.history.push('/checkout')
  }

  
  render() {
    console.log(this.state.purchasing);


    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredinents cant be loaded</p> : <Spinner />

    

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchase(this.props.ings)}
            ordered={this.purchaseHandle}
          />
        </Fragment>
      )

      orderSummary = (<OrderSummary
        purchaseCanceled={this.closedModalHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings}
        price={this.props.price}
      />)
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

const mapStateToProps = (state) => {
  return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => {
        return dispatch(burgerBilderActions.addIngredient(ingName))
    },
    onIngredientRemoved: (ingName) => {
        return dispatch(burgerBilderActions.removeIngredient(ingName))
    },
    onInitIngredients: () => {
        return dispatch(burgerBilderActions.initIngredients())
    },
    onInitPurchase: () => {
        return dispatch(burgerBilderActions.purchaseInit())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
