import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import FoodProducts from '../components/FoodProducts'
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { Spinner } from 'react-bootstrap'
import ProfileCard from '../components/ProfileCard';


function IngredientsProfile() {

    const [finishedLoading, setFinishedLoading] = useState(null)
    const { id } = useParams();
    const {setProfileType, ingredientProfile, setIngredientProfile } = useContext(VeganContext)

    useEffect(() => {
        setProfileType('ingredient')
        const fetchData = async () => {
            try {
                const response = await Axios.get(`ingredients/profile/${id}`)
                setIngredientProfile(response.data.data)
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
                    image={ingredientProfile.Ingredients.image}
                    title={ingredientProfile.Ingredients.name}
                    by={ingredientProfile.Ingredients.username}
                    desc={ingredientProfile.Ingredients.description}
                />
                : <Spinner animation="border" />
            }
            {finishedLoading ? <FoodProducts /> : <Spinner animation="border" />}
        </div>
    )
}

export default IngredientsProfile
