import React, { useState } from "react";

function Test() {
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
    values.splice(1, 1);
    setInputFields(values);
  };

  return (
    <div className="generalPage">
      <form>
        {inputFields.map((inputField, index) => (
          <div key={index} className="multipleInputRow">
            <label>{`Index: ${index}  `}</label>
            <input
              name="firstName"
              type="text"
              className="textInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].firstName}
              placeholder="First Name"
            />
            <input
              name="lastName"
              type="text"
              className="textInput"
              onChange={(e) => handleChangeInput(index, e)}
              value={inputFields[index].lastName}
              placeholder="Last Name"
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

export default Test;
