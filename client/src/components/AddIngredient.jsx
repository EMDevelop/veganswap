import React, { useState, useContext, useEffect } from "react";
import CollapsibleDiv from "./CollapsibleDiv";
import SearchDropDown from "./SearchDropDown";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { Spinner } from "react-bootstrap";
import ToolTip from "./ToolTip";

function AddIngredient() {
  const [form, setForm] = useState(<></>);

  //   useEffect(() => {
  //     setForm(true);
  //   }, []);

  return (
    <CollapsibleDiv autoOpen="yes">
      <h1 className="subHeadingSmall">Is your ingredient Vegan?</h1>
      <div className="formHeader">
        <div className="formHeaderButtons">
          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() => setForm(<VeganIngredient />)}
          >
            Vegan
          </button>

          <button
            className="customButton"
            value="VeganIngredient"
            onClick={() => setForm(<NonVeganIngredient />)}
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
// ------------------------------------------------------

// Vegan Ingreident

// ------------------------------------------------------
const VeganIngredient = () => {
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [textValue, setTextValue] = useState([]);
  const [buttonText, setButtonText] = useState("Submit");
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  // const [image, setImage] = useState([])
  const [variety, setVariety] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  const { swapList, setSwapList } = useContext(VeganContext);

  const handleInputSelect = (e, id) => {
    setSelectedIngredient(id);
    setTextValue(e.target.innerText);
    setOptions([]);
    setErrorMessage([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedIngredient) {
      try {
        setFinishedFormSubmit(false);
        setButtonText("Sending...");
        const veganIngredient = await Axios.post("/vIngredient", {
          name,
          variety,
          description,
          selectedIngredient,
        });
        setButtonText("Sent, thanks very much for contributing!");
        setFinishedFormSubmit(true);
        setDescription([]);
        setVariety([]);
        setName([]);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMessage("Error: Please select a Non-Vegan Igredient");
    }
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
        setFinishedRequest(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {finishedRequest ? (
        <form className="formContainer">
          {/* Error and Loading wheel */}
          {errorMessage && <p className="errorText">{errorMessage}</p>}
          {!finishedFormSubmit && <Spinner animation="border" />}

          {/* Main Form */}
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
            <textarea
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

// ------------------------------------------------------

// Non Vegan Ingreident

// ------------------------------------------------------

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

export default AddIngredient;
