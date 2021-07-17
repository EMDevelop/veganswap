import React, {useState, useEffect, useContext} from 'react'
import AddButton from '../components/AddButton'
import AddFoodProduct from '../components/AddFoodProduct'
import AddIngredient from '../components/AddIngredient'
import AddRecipe from '../components/AddRecipe'
import {VeganContext} from '../context/VeganContext'

// import SearchDropDown from '../components/SearchDropDown'

function Add() {

    const [addComponent, setAddComponent] = useState(<></>)

    return (
        <div className="generalPage">

            <h1 className="mainPageHeader">
                What would you like to Add? 
            </h1>
            <div className="step">
                <button className="customButton" value = "Ingredient" onClick={() => setAddComponent(<AddIngredient/>)}>Ingredient</button>
                <button className="customButton" value = "Ingredient" onClick={() => setAddComponent(<AddRecipe/>)}>Recipe</button>
                <button className="customButton" value = "Ingredient" onClick={() => setAddComponent(<AddFoodProduct/>)}>Food Product</button>
            </div>
           
            {addComponent}

        </div>
    )
}

export default Add
