import React, { useContext, useState, useEffect } from 'react';
import { VeganContext } from '../context/VeganContext';
import PreviewCard from './cards/PreviewCard';
import { Grid } from '@material-ui/core';
import CollapsibleDiv from './CollapsibleDiv';

function FoodProducts(props) {
  const { ingredientProfile, alternatives } = useContext(VeganContext);

  return (
    <div className="alternativeList">
      <CollapsibleDiv label="Suggested Products" autoOpen="yes">
        <Grid className="gridLayout" container spacing={0}>
          {props.type === 'ingredient'
            ? ingredientProfile.foodProducts.map((product) => {
                return (
                  <PreviewCard
                    key={product.id}
                    name={product.productname}
                    image={product.image}
                    createUser={product.brandname}
                    identifier={product.id}
                    type="foodProduct"
                  />
                );
              })
            : alternatives.FoodProducts.map((product) => {
                return (
                  <PreviewCard
                    key={product.id}
                    name={product.productname}
                    image={product.image}
                    createUser={product.brandname}
                    identifier={product.id}
                    type="foodProduct"
                  />
                );
              })}
        </Grid>
      </CollapsibleDiv>
    </div>
  );
}

export default FoodProducts;
