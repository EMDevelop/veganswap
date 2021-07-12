import React, {useState,createContext} from "react";

export const VeganContext = createContext();

export const VeganContextProvider = props => {

    const [swapList, setSwapList] = useState([]);
    const [alternatives, setAlternatives] = useState([])
    const [ingredientProfile, setIngredientProfile] = useState([])
    const [foodProduct, setFoodProduct] = useState([])
    const [brand, setBrand] = useState([])
    const [recipe, setRecipe,] = useState([])
    const [recipeSteps, setRecipeSteps] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [profileType, setProfileType] = useState([])
    const [addDropdown, setAddDropdown] = useState("I'd like to add a...")

    return (

        <VeganContext.Provider value={{
            swapList, 
            setSwapList, 
            alternatives,
            setAlternatives,
            ingredientProfile,
            setIngredientProfile,
            foodProduct,
            setFoodProduct,
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