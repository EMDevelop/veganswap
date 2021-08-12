import React, { useState } from "react";

// Database Structure
//  recipeingredient
// recipes_id, seq, quantity, measure, name, note

function MultiFormAddIngredients() {
  const [inputFields, setInputFields] = useState([
    { firstName: "", lastName: "" },
  ]);

  const handleChangeInput = (index, e) => {
    let values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
    console.log(inputFields);
  };

  const handleAdd = (index) => {
    let values = [...inputFields];
    values.splice(index + 1, 0, { firstName: "", lastName: "" });
    setInputFields(values);
  };

  const handleRemove = (index) => {
    let values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div>
      <form>
        {inputFields.map((inputField, index) => (
          <div key={index} className="multipleInputRow">
            <label className="formLabel">{`Ingredient: ${index + 1}  `}</label>

            <input
              name="quantity"
              type="text"
              className="quantityInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].firstName}
              placeholder="Qnt"
            />
            <input
              name="measure"
              type="text"
              className="textInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].firstName}
              placeholder="Measure"
            />
            <input
              name="name"
              type="text"
              className="textInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].firstName}
              placeholder="Ingredient Name"
            />
            <input
              name="note"
              type="text"
              className="textInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].lastName}
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
      </form>
    </div>
  );
}

export default MultiFormAddIngredients;
