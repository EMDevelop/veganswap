import React, { useContext, useEffect, useState } from 'react'
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { useHistory } from 'react-router-dom';
import SearchDropDown from './SearchDropDown';

function SwapWindow() {


    const { swapList, setSwapList } = useContext(VeganContext);

    let history = useHistory();
    const handleInputSelect = (e, id) => {
        history.push(`/alternatives/${dropdownSelect}/${id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("/swapList")
                setSwapList(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const [options, setOptions] = useState([])
    const onInputChange = (e) => {
        switch (dropdownSelect) {
            case 'ingredient':
                setOptions(swapList.ingredients.filter(option => option.name.toLowerCase().includes(e.target.value.toLowerCase())))
                break;
            case 'recipe':
                setOptions(swapList.recipes.filter(option => option.title.toLowerCase().includes(e.target.value.toLowerCase())))
                break;
            default:
                console.log("not a valid selection")
        }
    }

    const [dropdownSelect, setDropdownSelect] = useState('ingredient')

    const onDropdownSelect = (e) => {
        setDropdownSelect(e.target.value)
        setOptions([])                    // This isn't working
    }

    // // might be something to do with this needs to change to do anything, so we need to remove its value from the onselect dropdown function somehow. 
    // //idk ho wyou link them
    // console.log(e.target.value)
    // if (!e.target.value) {                  // this isn't working
    //     setOptions([])
    // }

    return (
        <div className="swapBox">
            <h1 className="mainPageHeader">Vegan Swap</h1>
            <div className="swapSearchBar">
                <select
                    // className="custom-select my-1 mr-sm-2"  
                    value={dropdownSelect}
                    onChange={(e) => onDropdownSelect(e)}
                >
                    <option value="ingredient">Ingredients</option>
                    <option value="recipe">Recipes</option>
                    <option disabled>Products (Coming Soon...)</option>
                </select>
                <SearchDropDown options={options} onInputChange={onInputChange} handleInputSelect={handleInputSelect} placeholder='Choose an item to swap' customClass="swapScreen" />
            </div>

        </div>
    )
}

export default SwapWindow
