import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import PreviewCard from './cards/PreviewCard';
import { VeganContext } from '../context/VeganContext';
import CollapsibleDiv from './CollapsibleDiv';

function RecipesList(props) {
  const { alternatives } = useContext(VeganContext);

  return (
    <div className="alternativeList">
      <CollapsibleDiv label="Recipes:" autoOpen="yes">
        <Grid className="gridLayout" container spacing={0}>
          {alternatives &&
            alternatives.Recipes.map((recipe) => {
              return (
                <PreviewCard
                  key={recipe.id}
                  name={recipe.title}
                  description={recipe.description}
                  image={recipe.image}
                  createUser={recipe.credit}
                  identifier={recipe.id}
                  type="recipe"
                />
              );
            })}
        </Grid>
      </CollapsibleDiv>
    </div>
  );
}

export default RecipesList;
