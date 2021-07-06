import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import IngredientBrands from '../components/IngredientBrands'
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { Spinner } from 'react-bootstrap'
import ProfileCard from '../components/ProfileCard';


function IngredientsProfile() {

    const [finishedLoading, setFinishedLoading] = useState(null)
    const { id } = useParams();
    const { setIngredientBrands, setSelectedIngredient, selectedIngredient, setProfileType } = useContext(VeganContext)

    useEffect(() => {
        setProfileType('ingredient')
        const fetchData = async () => {
            try {
                const response = await Axios.get(`ingredients/profile/${id}`)
                setSelectedIngredient(response.data.data.Ingredients)
                setIngredientBrands(response.data.data.BrandList)
                setFinishedLoading(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="generalPage">
            {/* <h1 className="mainPageHeader"> {`${selectedIngredient.name} Profile`} </h1> */}


            {finishedLoading ?
                <ProfileCard
                    image={selectedIngredient.image}
                    title={selectedIngredient.name}
                    by={selectedIngredient.username}
                    desc={selectedIngredient.description}
                />
                : <Spinner animation="border" />
            }
            {finishedLoading ? <IngredientBrands /> : <Spinner animation="border" />}
        </div>
    )
}

export default IngredientsProfile
