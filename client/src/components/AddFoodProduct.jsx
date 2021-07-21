import React, { useState } from "react";
import FormAddFoodProduct from "./FormAddFoodProduct";
import CollapsibleDiv from "./CollapsibleDiv";
import ToolTip from "./ToolTip";

function AddFoodProduct() {
  const [form, setForm] = useState(<></>);
  return (
    <CollapsibleDiv autoOpen="yes">
      <h1 className="subHeadingSmall">
        Is your product an alternative for an Ingredient or a Recipe?
      </h1>
      <div className="formHeader">
        <div className="formHeaderButtons">
          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() =>
              setForm(
                <FormAddFoodProduct
                  type="ingredient"
                  customOptions="name"
                  variety={true}
                />
              )
            }
          >
            Ingredient
          </button>

          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() =>
              setForm(
                <FormAddFoodProduct type="recipe" customOptions="title" />
              )
            }
          >
            Recipe
          </button>
        </div>
        <div className="formHeaderToolTip">
          <ToolTip>
            <p className="toolText">
              Ingredient: An example of this would be "Vegan Mayo, Hellmans" as
              an alternative for the ingredient "Vegan Mayonanaise"
            </p>
            <p className="toolText">
              Recipe: An example of this would be "Mushroom Spaghetti Bol, Tesco
              Plant Chef" as an alternative for the recipe "Spagetti Bolognese"
            </p>
          </ToolTip>
        </div>
      </div>
      {form}
    </CollapsibleDiv>
  );
}

export default AddFoodProduct;
