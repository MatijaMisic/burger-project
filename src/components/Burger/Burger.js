import React from "react";
import "./Burger.css";

import BurgerIngredient from "./BurgerIngridient/BurgerIngredient";

const Burger = props => {
  let trasnformedIngredients = Object.keys(props.ingredients).map(igkey => {
    return [...Array(props.ingredients[igkey])].map((_, i) => {
      return <BurgerIngredient key={igkey + i} type={igkey} />;
    });
  }).reduce((arr, el) => {
      return arr.concat(el)
  } , [] );
  console.log(trasnformedIngredients);

  if(trasnformedIngredients.length === 0) {
      trasnformedIngredients = <p> Please add ingredients </p>
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {trasnformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
