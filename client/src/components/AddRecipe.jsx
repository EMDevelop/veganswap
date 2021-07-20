import React, { useState } from "react";
import CollapsibleDiv from "./CollapsibleDiv";
import ToolTip from "./ToolTip";
import AddNonVeganRecipe from "./AddNonVeganRecipe";
import AddVeganRecipe from "./AddVeganRecipe";

function AddRecipe() {
  const [form, setForm] = useState(<></>);
  const [showLinkChoice, setShowLinkChoice] = useState(false);

  const handleVeganSelect = () => {
    setForm(<></>);
    setShowLinkChoice(true);
  };

  const handleNonVeganSelect = () => {
    setShowLinkChoice(false);
    setForm(<AddNonVeganRecipe />);
  };

  return (
    <CollapsibleDiv autoOpen="yes">
      {/* Vegan / not vegan*/}
      <h1 className="subHeadingSmall">Is your recipe Vegan?</h1>
      <div className="formHeader">
        <div className="formHeaderButtons">
          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() => handleVeganSelect()}
          >
            Vegan
          </button>

          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() => handleNonVeganSelect()}
          >
            Non-Vegan
          </button>
        </div>
        <div className="formHeaderToolTip">
          <ToolTip>
            <p className="toolText">
              Vegan: You'll be adding a Vegan ingredient, and telling the
              community which non-vegan ingredient this is an Alternative for.
            </p>
            <p className="toolText">
              Non-Vegan: You'll be adding a non-vegan ingredient that you'd like
              the community to suggest alternatives for.
            </p>
          </ToolTip>
        </div>
      </div>

      {/* ingredient/Recipe */}
      {showLinkChoice && (
        <>
          <h1 className="subHeadingSmall">
            Is your recipe an alternative for an Ingredient or a Recipe?
          </h1>
          <div className="formHeader">
            <div className="formHeaderButtons">
              <button
                className="customButton"
                value="VeganIngredient"
                onClick={() =>
                  setForm(
                    <AddVeganRecipe
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
                    <AddVeganRecipe type="recipe" customOptions="title" />
                  )
                }
              >
                Recipe
              </button>
            </div>
            <div className="formHeaderToolTip">
              <ToolTip>
                <p className="toolText">
                  Ingredient: You might have a recipe which is an alternative
                  for an ingredient, e.g. A recipe for ketchup.
                </p>
                <p className="toolText">
                  Recipe: You might have a recipe which is an alternative for a
                  recipe, e.g. A recipe for Spagetti Bolognese.
                </p>
              </ToolTip>
            </div>
          </div>
        </>
      )}
      {form}
    </CollapsibleDiv>
  );
}

export default AddRecipe;
