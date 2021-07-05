import React, {useContext} from 'react'
import { Grid } from "@material-ui/core";
import PreviewCard from './PreviewCard';
import { VeganContext } from '../context/VeganContext'

function RecipesList(props) {


    const { recipesList } = useContext(VeganContext);

    return (
        <>
            <h1 className="subHeading">
                Recipes:
            </h1> 
            <Grid 
                className="gridLayout"  
                container spacing={0}           
            >
                {recipesList && recipesList.map( (recipe) => {
                    return(
                    <PreviewCard 
                        key={recipe.id} 
                        name={recipe.title}
                        description={recipe.description}
                        image={recipe.image}
                        createUser={recipe.username}
                        identifier={recipe.id}
                        type="recipe"
                    />
                    )
                })} 
         </Grid>
        </>  
    )
}

export default RecipesList
