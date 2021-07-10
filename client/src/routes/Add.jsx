import React, {useState, useEffect, useContext} from 'react'
// import AddButton from '../components/AddButton'
import {VeganContext} from '../context/VeganContext'

// import SearchDropDown from '../components/SearchDropDown'

function Add() {

    
    const {addDropdown, setAddDropdown} = useContext(VeganContext)

    const [addComponent, setAddComponent] = useState(<p>this worked</p>)
    const [linkComponent, linkAddComponent] = useState(<p>this worked</p>)

    const handleDropdownSelect = (e) => {
        setAddDropdown(e.target.value)
    }

    return (
        <div className="generalPage">

            <div className="step">
            I'd like to add a..
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
            To replace A....
            <div className="step">
                {addComponent}
            </div>
            <div className="step">
                {linkComponent}
            </div>

        </div>
    )
}

export default Add
