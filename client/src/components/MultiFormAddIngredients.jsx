import React, { useState } from "react";

// Database Structure
//  recipeingredient
// recipes_id, seq, quantity, measure, name, note

function MultiFormAddIngredients(props) {
  const [inputFields, setInputFields] = useState([
    {
      recipe_id: "",
      seq: 1,
      quantity: "",
      measure: "",
      name: "",
      note: "",
      createuser: 1,
    },
  ]);

  const handleChangeInput = (index, e) => {
    let values = [...inputFields];
    let accumulator = 1;
    // Set Sequence Every Time, Index unreliable
    values.map((row) => {
      row["seq"] = accumulator;
      accumulator = accumulator + 1;
    });
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
    props.passChildData(values);
  };

  const handleAdd = (index) => {
    let values = [...inputFields];
    values.splice(index + 1, 0, {
      recipe_id: "",
      seq: index + 2,
      quantity: "",
      measures: "",
      name: "",
      note: "",
      createuser: 1,
    });
    setInputFields(values);
  };

  const handleRemove = (index) => {
    let values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div className="multiIngredientsList">
      {inputFields.map((inputField, index) => (
        <div key={index} className="multipleInputRow">
          <label className="formLabel">{`Ingredient: ${index + 1}  `}</label>
          <label className="formLabel">
            Quantity:
            <input
              name="quantity"
              type="text"
              className="input50"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].quantity}
              placeholder="1"
            />
          </label>
          <label className="formLabel">
            Measure:
            <input
              name="measure"
              type="text"
              className="input50"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].measure}
              placeholder="g"
            />
          </label>
          <label className="formLabel">
            Ingredient Name:
            <input
              name="name"
              type="text"
              className="textInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].name}
              placeholder="Salt"
            />
          </label>
          <label className="formLabel">
            Other Notes
            <input
              name="note"
              type="text"
              className="textInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].note}
              placeholder="Himalayan Pink Salt for best results"
            />
          </label>

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
