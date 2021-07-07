import React, {useState,createContext} from "react";

export const VeganContext = createContext();

export const VeganContextProvider = props => {

    const [notVegan, setNotVegan] = useState([]);
    const [recipesList, setRecipesList] = useState([]);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState([])
    const [ingredientBrands, setIngredientBrands] = useState([])
    const [brand, setBrand] = useState([])
    const [recipe, setRecipe,] = useState([])
    const [recipeSteps, setRecipeSteps] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [profileType, setProfileType] = useState([])
    const [addDropdown, setAddDropdown] = useState("I'd like to add a...")

    return (

        <VeganContext.Provider value={{
            notVegan, 
            setNotVegan, 
            recipesList, 
            setRecipesList, 
            ingredientsList, 
            setIngredientsList, 
            selectedIngredient, 
            setSelectedIngredient, 
            ingredientBrands, 
            setIngredientBrands, 
            brand, 
            setBrand, 
            recipe, 
            setRecipe, 
            recipeSteps,
            setRecipeSteps, 
            recipeIngredients, 
            setRecipeIngredients, 
            profileType,
            setProfileType, 
            addDropdown, 
            setAddDropdown
            }}
        >
            {props.children}
        </VeganContext.Provider>
        
    )
}