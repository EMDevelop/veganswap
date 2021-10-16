import React, { useState } from 'react';
import CollapsibleDiv from '../global/CollapsibleDiv';
import ToolTip from '../global/ToolTip';
import FormAddIngredientVegan from '../forms/FormAddIngredientVegan';
import FormAddIngredientNonVegan from '../forms/FormAddIngredientNonVegan';

function AddIngredient() {
  const [form, setForm] = useState(<></>);
  const [veganDropdownSelect, setVeganDropdownSelect] = useState('_____');

  const onVeganDropdownSelect = (e) => {
    setVeganDropdownSelect(e.target.value);
    console.log('TODO: Switch Change: client/src/components/AddRecipe.jsx');

    switch (e.target.value) {
      case 'Vegan':
        setForm(<FormAddIngredientVegan />);
        break;
      case 'NVegan':
        setForm(<FormAddIngredientNonVegan />);
        break;
      default:
        break;
    }
  };

  return (
    <CollapsibleDiv autoOpen="yes">
      <div className="formQuestions">
        <div className="formQuestion">
          <h2 className="formQuestionSubheading">Is your ingredient Vegan?</h2>
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

      {form}
    </CollapsibleDiv>
  );
}

export default AddIngredient;
