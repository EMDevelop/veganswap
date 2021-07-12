import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { Spinner } from 'react-bootstrap'
import VeganIngredientAlternatives from '../components/VeganIngredientAlternatives';
import VeganRecipeAlternatives from '../components/VeganRecipeAlternatives';

function Alternatives() {

    const { id, type } = useParams();
    const [finishedLoading, setFinishedLoading] = useState(null)
    const {setAlternatives} = useContext(VeganContext);

    const [componentLoad, setComponentLoad] = useState([])



    useEffect(() => {


        switch(type) {
            case 'ingredient':
                setComponentLoad( <VeganIngredientAlternatives/>)
            break;
            case 'recipe':
                setComponentLoad( <VeganRecipeAlternatives/>)
            break;
            default: 
                console.log('Invalid Selection')

        }
        // if (type === 'ingredient') {
            
        // } 

        const fetchData = async () => {
            try {
                switch (type) {
                    case 'ingredient':
                        const response = await Axios.get(`/alternatives/${type}/${id}`)
                        setAlternatives(response.data.data)
                        setFinishedLoading(true)
                    break;
                    case 'recipe':
                       console.log('recipe data')
                       setFinishedLoading(true)
                    break;
                    default:
                        console.log("Invalid Page")
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [])


    return (
        <>
            {finishedLoading ? componentLoad : <Spinner animation="border" />}
        </>
    )
}
export default Alternatives
