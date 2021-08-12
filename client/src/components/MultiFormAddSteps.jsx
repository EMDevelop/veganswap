import React, { useState } from "react";

// Database Structure
//  recipestep
// recipes_id, seq, description, createuser

function MultiFormAddSteps() {
  const [inputFields, setInputFields] = useState([{ description: "" }]);

  const handleChangeInput = (index, e) => {
    let values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputFields(values);
    console.log(inputFields);
  };

  const handleAdd = (index) => {
    let values = [...inputFields];
    values.splice(index + 1, 0, { description: "" });
    setInputFields(values);
  };

  const handleRemove = (index) => {
    let values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div>
      {inputFields.map((_, index) => (
        <div key={index} className="multipleInputRow">
          <label className="formLabel">{`Step: ${index + 1}`}</label>
          <input
            name="description"
            type="text"
            className="stepInput"
            onChange={(e) => handleChangeInput(index, e)}
            value={inputFields[index].description}
            placeholder="e.g. cut tomatos"
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

export default MultiFormAddSteps;
