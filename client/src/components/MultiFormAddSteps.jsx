import React, { useState } from "react";

// Database Structure
//  recipestep
// recipes_id, seq, description, createuser

function MultiFormAddSteps(props) {
  const [inputFields, setInputFields] = useState([
    { recipe_id: "", seq: 1, description: "", createuser: 1 },
  ]);

  const handleChangeInput = (index, e) => {
    let values = [...inputFields];
    let accumulator = 1;
    values[index][e.target.name] = e.target.value;
    // Set Sequence Every Time, Index unreliable
    values.map((row) => {
      row["seq"] = accumulator;
      accumulator = accumulator + 1;
    });
    setInputFields(values);
    props.passChildData(values);
  };

  const handleAdd = (index) => {
    let values = [...inputFields];
    values.splice(index + 1, 0, {
      recipe_id: "",
      seq: 1,
      description: "",
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
    <div>
      {inputFields.map((_, index) => (
        <div key={index} className="multipleInputRow">
          <label className="formLabel">{`Step: ${index + 1}`}</label>
          <label className="formLabel">
            Instruction:
            <input
              name="description"
              type="text"
              className="stepInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].description}
              placeholder="e.g. cut tomatoes"
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

export default MultiFormAddSteps;
