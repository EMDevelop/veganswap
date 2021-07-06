import React, { useContext } from 'react'
import { Grid } from "@material-ui/core";
import PreviewCard from './PreviewCard';
import { VeganContext } from '../context/VeganContext'

function IngredientsList(props) {

    const { ingredientsList } = useContext(VeganContext);


    return (
        <div className="alternativeList">
            <h1 className="subHeading">
                Ingredients:
            </h1>
            <Grid
                className="gridLayout"
                container spacing={0}
            >
                {ingredientsList && ingredientsList.map((ingredient) => {
                    return (
                        <PreviewCard
                            key={ingredient.id}
                            name={ingredient.name}
                            description={ingredient.description}
                            image={ingredient.image}
                            createUser={ingredient.username}
                            identifier={ingredient.id}
                            type="ingredient"
                        />
                    )
                })}
            </Grid>
        </div>
    )
}

export default IngredientsList
