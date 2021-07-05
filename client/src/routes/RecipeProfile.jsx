import React, {usestate, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { Spinner } from 'react-bootstrap'

function RecipeProfile() {

    const {id} = useParams();
    const {recipe, setRecipe} = useContext(VeganContext)

    useEffect(() => {
        
        const fetchData = async () => { 
            try {
                const response = await Axios.get(`/recipes/profile/${id}`)
                setRecipe(response.data.data.Profile)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [])

    return (
        <>
             <h1 className="mainPageHeader">Recipe Profile</h1> 

<p>{recipe.title}</p>
        </>
    )
}

export default RecipeProfile
