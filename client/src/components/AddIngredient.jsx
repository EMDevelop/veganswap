import React, { useState } from "react";
import CollapsibleDiv from "./CollapsibleDiv";
import ToolTip from "./ToolTip";
import FormAddIngredientVegan from "./FormAddIngredientVegan";
import FormAddIngredientNonVegan from "./FormAddIngredientNonVegan";

function AddIngredient() {
  const [form, setForm] = useState(<></>);
  const [dropdownSelect, setDropdownSelect] = useState("_____");

  const onDropdownSelect = (e) => {
    setDropdownSelect(e.target.value);

    switch (e.target.value) {
      case "Vegan":
        setForm(<FormAddIngredientVegan />);
        break;
      case "NVegan":
        setForm(<FormAddIngredientNonVegan />);
        break;
      default:
        break;
    }
  };

  return (
    <CollapsibleDiv autoOpen="yes">
      <div className="formQuestion">
        <div className="questionAnswer">
          <h2 className="swapSubHeader">Is your ingredient Vegan?</h2>
          <select
            className="swapDropdown"
            value={dropdownSelect}
            onChange={(e) => onDropdownSelect(e)}
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
