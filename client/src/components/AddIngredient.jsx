import React, { useState, useContext, useEffect } from "react";
import CollapsibleDiv from "./CollapsibleDiv";
import SearchDropDown from "./SearchDropDown";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { Spinner } from "react-bootstrap";

const VeganIngredient = () => {
  const [finishedLoading, setFinishedLoading] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [textValue, setTextValue] = useState([]);
  const [buttonText, setButtonText] = useState("Submit");
  // const [buttonText, setButtonText] = useState('Submit')
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  // const [image, setImage] = useState([])
  const [variety, setVariety] = useState([]);

  const { swapList, setSwapList } = useContext(VeganContext);

  const handleInputSelect = (e, id) => {
    setSelectedIngredient(id);
    setTextValue(e.target.innerText);
    setOptions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const onInputChange = (e) => {
    swapList &&
      setOptions(
        swapList.ingredients.filter((option) =>
          option.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    setTextValue(e.target.value);
    if (e.target.value === "") {
      setOptions([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/ingredients");
        setSwapList(response.data.data);
        setFinishedLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {finishedLoading ? (
        <form className="formContainer">
          <label className="formLabel">
            Choose a Non-Vegan Ingredient to link your alternative to:
            <SearchDropDown
              options={options}
              textValue={textValue}
              onInputChange={onInputChange}
              handleInputSelect={handleInputSelect}
              placeholder="Non-Vegan Ingredient Link"
              customClass="addScreen" /* btw, this is same as: className = addDropdown */
            />
          </label>
          <label className="formLabel">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="textInput"
              placeholder="e.g. Tofu"
            />
          </label>
          <label className="formLabel">
            Variety:
            <input
              type="text"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="textInput"
              placeholder="e.g. Firm"
            />
          </label>
          <label className="formLabel">
            Description:
            <textArea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textInputArea"
              placeholder="e.g. Tofu, also known as bean curd, is a food prepared by coagulating soy milk and then pressing the resulting curds into solid white blocks of varying softness..."
            />
          </label>
          {/*  needs some work */}
          <label className="formLabel">
            Image:
            <input type="file" className="uploadImage" />
          </label>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            {buttonText}
          </button>
        </form>
      ) : (
        <div className="spinnerContainer">
          <Spinner animation="border" />{" "}
        </div>
      )}
    </>
  );
};

const NonVeganIngredient = () => {
  const [buttonText, setButtonText] = useState("Submit");
  const [name, setName] = useState([]);
  const [variety, setVariety] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setButtonText("Sending...");
      await Axios.post("/nvIngredient", {
        name,
        variety,
      });
      setButtonText("Sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="formContainer">
      <label className="formLabel">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="textInput"
          placeholder="e.g. Cheese"
        />
      </label>
      <label className="formLabel">
        Variety:
        <input
          type="text"
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
          className="textInput"
          placeholder="e.g. Cheddar"
        />
      </label>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
};

function AddIngredient() {
  const [checked, setChecked] = React.useState(false);
  const handleChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <CollapsibleDiv label="Add Your Ingredient Below:" autoOpen="yes">
      <div className="formHeader">
        <label className="checkboxContainer">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChecked}
            className="checkBox"
          />
          Vegan Ingredient?
        </label>
      </div>

      {checked ? <VeganIngredient /> : <NonVeganIngredient />}
    </CollapsibleDiv>
  );
}

export default AddIngredient;
