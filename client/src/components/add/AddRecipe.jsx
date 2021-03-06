import React, { useState } from 'react';
import CollapsibleDiv from '../global/CollapsibleDiv';
import ToolTip from '../global/ToolTip';
import FormAddRecipeNonVegan from '../forms/FormAddRecipeNonVegan';
import FormAddRecipeVegan from '../forms/FormAddRecipeVegan';

function AddRecipe() {
  const [form, setForm] = useState(<></>);
  const [showLinkChoice, setShowLinkChoice] = useState(false);
  const [veganDropdownSelect, setVeganDropdownSelect] = useState('_____');
  const [alternativeDropdownSelect, setAlternativeDropdownSelect] =
    useState('_____');

  const onVeganDropdownSelect = (e) => {
    setVeganDropdownSelect(e.target.value);
    console.log('TODO: Switch Change: client/src/components/AddRecipe.jsx');
    switch (e.target.value) {
      case 'Vegan':
        setForm(<></>);
        setShowLinkChoice(true);
        break;
      case 'NVegan':
        setShowLinkChoice(false);
        setForm(<FormAddRecipeNonVegan />);
        break;
      default:
        break;
    }
  };

  const onAlternativeDropdownSelect = (e) => {
    setAlternativeDropdownSelect(e.target.value);
    console.log('TODO: Switch Change: client/src/components/AddRecipe.jsx');
    switch (e.target.value) {
      case 'recipe':
        setForm(<FormAddRecipeVegan type="recipe" customOptions="title" />);
        break;
      case 'ingredient':
        setForm(
          <FormAddRecipeVegan
            type="ingredient"
            customOptions="name"
            variety={true}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <CollapsibleDiv autoOpen="yes">
      <div className="formQuestions">
        <div className="formQuestion">
          <h2 className="formQuestionSubheading">Is your recipe Vegan?</h2>
        </div>
        <div className="formAnswer">
          <select
            className="swapDropdown"
            value={veganDropdownSelect}
            onChange={(e) => onVeganDropdownSelect(e)}
          >
            <option disabled>_____</option>
            <option value="Vegan">Yes</option>
            <option value="NVegan">No</option>
          </select>
        </div>
        <div className="toolTipForm">
          <ToolTip>
            <p className="toolText">
              Vegan: You'll be adding a Vegan recipe, and telling the community
              which non-vegan ingredient this is an Alternative for.
            </p>
            <p className="toolText">
              Non-Vegan: You'll be adding a non-vegan recipe that you'd like the
              community to suggest alternatives for.
            </p>
          </ToolTip>
        </div>
      </div>
      {showLinkChoice && (
        <div className="formQuestions">
          <div className="formQuestion">
            <h2 className="formQuestionSubheading">
              Is your recipe an alternative for an Ingredient or a Recipe?
            </h2>
          </div>
          <div className="formAnswer">
            <select
              className="swapDropdown"
              value={alternativeDropdownSelect}
              onChange={(e) => onAlternativeDropdownSelect(e)}
            >
              <option disabled>_____</option>
              <option value="recipe">Recipe</option>
              <option value="ingredient">Ingredient</option>
            </select>
          </div>
          <div className="toolTipForm">
            <ToolTip>
              <p className="toolText">
                Ingredient: You might have a recipe which is an alternative for
                an ingredient, e.g. A recipe for ketchup.
              </p>
              <p className="toolText">
                Recipe: You might have a recipe which is an alternative for a
                recipe, e.g. A recipe for Spagetti Bolognese.
              </p>
            </ToolTip>
          </div>
        </div>
      )}

      {form}
    </CollapsibleDiv>
  );
}

export default AddRecipe;
