import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import PreviewCard from '../cards/PreviewCard';
import { VeganContext } from '../../context/VeganContext';
import CollapsibleDiv from '../global/CollapsibleDiv';

function IngredientsList() {
  const { alternatives } = useContext(VeganContext);

  return (
    <div className="alternativeList">
      <CollapsibleDiv label="Ingredients:" autoOpen="yes">
        <Grid className="gridLayout" container spacing={0}>
          {alternatives &&
            alternatives.Ingredients.map((ingredient) => {
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
              );
            })}
        </Grid>
      </CollapsibleDiv>
    </div>
  );
}

export default IngredientsList;
