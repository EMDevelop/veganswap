import React, {useState,createContext} from "react";

export const VeganContext = createContext();

export const VeganContextProvider = props => {

    const [notVegan, setNotVegan] = useState([]);
    const [recipesList, setRecipesList] = useState([]);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState([])
    const [ingredientBrands, setIngredientBrands] = useState([])
    const [brand, setBrand] = useState([])

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
            setBrand
            }}
        >
            {props.children}
        </VeganContext.Provider>
        
    )
}