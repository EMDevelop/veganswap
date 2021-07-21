import React, { useState, useEffect, useContext } from "react";
import AddFoodProduct from "../components/AddFoodProduct";
import AddIngredient from "../components/AddIngredient";
import AddRecipe from "../components/AddRecipe";

// import SearchDropDown from '../components/SearchDropDown'

function Add() {
  const [addComponent, setAddComponent] = useState(<></>);

  return (
    <div className="generalPage">
      <div className="addHeader">
        <h1 className="subHeading">What would you like to Add?</h1>
        <div className="addHeaderButtons">
          <button
            className="customButton"
            value="Ingredient"
            onClick={() => setAddComponent(<AddIngredient />)}
          >
            Ingredient
          </button>
          <button
            className="customButton"
            value="Recipe"
            onClick={() => setAddComponent(<AddRecipe />)}
          >
            Recipe
          </button>
          <button
            className="customButton"
            value="FoodProduct"
            onClick={() => setAddComponent(<AddFoodProduct />)}
          >
            Suggested Product
          </button>
        </div>
      </div>
      {addComponent}
    </div>
  );
}

export default Add;
