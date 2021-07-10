import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import IngredientsList from '../components/IngredientsList'
import RecipesList from '../components/RecipesList'
import { Grid } from '@material-ui/core'
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { Spinner } from 'react-bootstrap'
import CollapsibleDiv from '../components/CollapsibleDiv';

function Alternatives() {
    const { id } = useParams();
    const [finishedLoading, setFinishedLoading] = useState(null)
    const {
        notVegan,
        setNotVegan,
        setRecipesList,
        setIngredientsList } = useContext(VeganContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`/alternatives/${id}`)
                setNotVegan(response.data.boh.Selected.name)
                setRecipesList(response.data.boh.Recipes)
                setIngredientsList(response.data.boh.Ingredients)
                setFinishedLoading(true)
            } catch (error) {
                console.log()
            }
        };
        fetchData();
    }, [])


    return (
        <div className="generalPage">

            <h1 className="mainPageHeader">{`Alternatives For: ${notVegan}`}</h1>
            <Grid
                container spacing={0}
                className="gridLayout"
            >
                <Grid item xs={12} sm={12} md={6}>
                    
                        {finishedLoading ? <IngredientsList /> : <Spinner animation="border" />}
                   
                    

                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    {finishedLoading ? <RecipesList /> : <Spinner animation="border" />}
                </Grid>
            </Grid>

        </div>
    )
}
export default Alternatives
