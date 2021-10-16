import React, { useState } from 'react';
import FormAddFoodProduct from './FormAddFoodProduct';
import CollapsibleDiv from './CollapsibleDiv';
import ToolTip from './global/ToolTip';

function AddFoodProduct() {
  const [form, setForm] = useState(<></>);
  const [alternativeDropdownSelect, setAlternativeDropdownSelect] =
    useState('_____');

  const onAlternativeDropdownSelect = (e) => {
    setAlternativeDropdownSelect(e.target.value);
    switch (e.target.value) {
      case 'recipe':
        setForm(<FormAddFoodProduct type="recipe" customOptions="title" />);
        break;
      case 'ingredient':
        setForm(
          <FormAddFoodProduct
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
