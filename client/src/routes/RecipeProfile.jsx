import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../apis/axios';
import { VeganContext } from '../context/VeganContext';
import { Spinner } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import SequenceCard from '../components/cards/SequenceCard';
import ProfileCard from '../components/cards/ProfileCard';

function RecipeProfile() {
  const { id } = useParams();
  const {
    setRecipe,
    setRecipeIngredients,
    setRecipeSteps,
    recipe,
    recipeSteps,
    recipeIngredients,
    setProfileType,
  } = useContext(VeganContext);
  const [finishedLoading, setFinishedLoading] = useState(null);

  useEffect(() => {
    setProfileType('recipe');

    const fetchData = async () => {
      try {
        const response = await Axios.get(`/recipes/profile/${id}`);
        setRecipe(response.data.data.Profile);
        setRecipeIngredients(response.data.data.Ingredients);
        setRecipeSteps(response.data.data.Steps);
        setFinishedLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="generalPage">
      {finishedLoading ? (
        <ProfileCard
          image={recipe.image}
          title={recipe.title}
          by={recipe.credit}
          desc={recipe.description}
        />
      ) : (
        <Spinner animation="border" />
      )}

      <Grid container spacing={0} className="gridLayout">
        <Grid item xs={12} sm={12} md={6}>
          {finishedLoading ? (
            <SequenceCard data={recipeIngredients} type="Ingredients" />
          ) : (
            <Spinner animation="border" />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {finishedLoading ? (
            <SequenceCard type="Steps" title="Step" data={recipeSteps} />
          ) : (
            <Spinner animation="border" />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default RecipeProfile;
