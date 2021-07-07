import React, { useContext, useEffect, useState } from 'react'
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { useHistory } from 'react-router-dom';

//Components
import SearchDropDown from './SearchDropDown';

function SwapWindow() {


    const { notVegan, setNotVegan } = useContext(VeganContext);


    let history = useHistory();
    const handleInputSelect = (e, id) => {
        history.push(`/alternatives/${id}`)
    }

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("/nonVegan")
                setNotVegan(response.data.data.NotVeganList)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const [options, setOptions] = useState([])
    const onInputChange = (e) => {
        setOptions(notVegan.filter(option => option.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }


    return (
        <div className="swapBox">
            <h1 className="mainPageHeader">Vegan Swap</h1>
            <SearchDropDown options={options} onInputChange={onInputChange} handleInputSelect={handleInputSelect} placeholder = 'Choose an item to swap' customClass ="swapScreen"/>
        </div>
    )
}

export default SwapWindow
