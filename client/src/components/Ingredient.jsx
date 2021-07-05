import React, {useContext} from 'react'
import { VeganContext } from '../context/VeganContext'



function Ingredient() {

const {selectedIngredient} = useContext(VeganContext)

    return (
        <div className ="profileCard">
            <img src={selectedIngredient.image} alt="Placeholder" />
            <p>{selectedIngredient.description}</p>
            <p>{selectedIngredient.username}</p>
        </div>
    )
}

export default Ingredient
