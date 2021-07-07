import React, {useState, useEffect, useContext} from 'react'
// import AddButton from '../components/AddButton'
import {VeganContext} from '../context/VeganContext'

// import SearchDropDown from '../components/SearchDropDown'

function Add() {

    
    const {addDropdown, setAddDropdown} = useContext(VeganContext)

    const handleDropdownSelect = (e) => {
        setAddDropdown(e.target.value)
    }

    return (
        <div className="generalPage">

            <div className="step">
                <select 
                        className="addDropdown"  
                        value={addDropdown} 
                        onChange={(e) => handleDropdownSelect(e)}
                        >
                            <option disabled>I'd like to add a...</option>
                            <option value="ingredient">Vegan ingredient</option>    
                            <option value="brand">Vegan brand</option>    
                            <option value="recipe">Vegan recipe</option>                     
                </select>
            </div>
            <div className="step">

            </div>
            <div className="step">

            </div>

        </div>
    )
}

export default Add
