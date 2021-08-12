import React, { useState } from "react";

// Database Structure
//  recipeingredient
// recipes_id, seq, quantity, measure, name, note

function MultiFormAddIngredients() {
  const [inputFields, setInputFields] = useState([
    { quantity: "", measure: "", name: "", note: "" },
  ]);

  const handleChangeInput = (index, e) => {
    let values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
    console.log(inputFields);
  };

  const handleAdd = (index) => {
    let values = [...inputFields];
    values.splice(index + 1, 0, {
      quantity: "",
      measure: "",
      name: "",
      note: "",
    });
    setInputFields(values);
  };

  const handleRemove = (index) => {
    let values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div>
      {inputFields.map((inputField, index) => (
        <div key={index} className="multipleInputRow">
          <label className="formLabel">{`Ingredient: ${index + 1}  `}</label>

          <input
            name="quantity"
            type="text"
            className="quantityInput"
            onChange={(e) => handleChangeInput(index, e)}
            value={inputFields[index].quantity}
            placeholder="Qnt"
          />
          <input
            name="measure"
            type="text"
            className="textInput"
            onChange={(e) => handleChangeInput(index, e)}
            value={inputFields[index].measure}
            placeholder="Measure"
          />
          <input
            name="name"
            type="text"
            className="textInput"
            onChange={(e) => handleChangeInput(index, e)}
            value={inputFields[index].name}
            placeholder="Ingredient Name"
          />
          <input
            name="note"
            type="text"
            className="textInput"
            onChange={(e) => handleChangeInput(index, e)}
            value={inputFields[index].note}
            placeholder="Ingredient Notes"
          />

          <div className="plusMinus">
            <i className="fas fa-plus" onClick={() => handleAdd(index)}></i>

            {index === 0 ? (
              <></>
            ) : (
              <i
                className="fas fa-minus"
                onClick={() => handleRemove(index)}
              ></i>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MultiFormAddIngredients;
