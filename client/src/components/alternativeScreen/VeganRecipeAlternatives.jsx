import React, { useContext } from 'react';
import RecipesList from '../resultList/RecipesList';
import { Grid } from '@material-ui/core';
import { VeganContext } from '../../context/VeganContext';
import FoodProducts from '../resultList/FoodProducts';

function VeganRecipeAlternatives() {
  const { alternatives } = useContext(VeganContext);

  return (
    <div className="generalPage">
      <h1 className="mainPageHeader">
        {`Alternatives For: ${alternatives.Selected.title}`}
      </h1>
      <Grid container spacing={0} className="gridLayout">
        <Grid item xs={12} sm={12} md={6}>
          <FoodProducts type="recipe" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <RecipesList />
        </Grid>
      </Grid>
    </div>
  );
}

export default VeganRecipeAlternatives;
