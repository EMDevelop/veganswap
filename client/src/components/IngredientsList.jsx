import React, { useContext } from 'react'
import { Grid } from "@material-ui/core";
import PreviewCard from './PreviewCard';
import { VeganContext } from '../context/VeganContext'
import CollapsibleDiv from './CollapsibleDiv';

function IngredientsList(props) {

    const { ingredientsList } = useContext(VeganContext);


    return (
        <div className="alternativeList">

            <CollapsibleDiv label="Ingredients:" autoOpen="yes">
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
        
            </CollapsibleDiv>
        </div>
    )
}

export default IngredientsList
