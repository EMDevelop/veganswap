import React, { useState } from "react";
import CollapsibleDiv from "./CollapsibleDiv";
import ToolTip from "./ToolTip";
import AddVeganIngredient from "./AddVeganIngredient";
import AddNonVeganIngredient from "./AddNonVeganIngredient";

function AddIngredient() {
  const [form, setForm] = useState(<></>);

  return (
    <CollapsibleDiv autoOpen="yes">
      <h1 className="subHeadingSmall">Is your ingredient Vegan?</h1>
      <div className="formHeader">
        <div className="formHeaderButtons">
          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() => setForm(<AddVeganIngredient />)}
          >
            Vegan
          </button>

          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() => setForm(<AddNonVeganIngredient />)}
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
      {form}
    </CollapsibleDiv>
  );
}

export default AddIngredient;
