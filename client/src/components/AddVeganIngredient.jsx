import React, { useState, useContext, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { Spinner } from "react-bootstrap";

function AddVeganIngredient() {
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [textValue, setTextValue] = useState([]);
  const [buttonText, setButtonText] = useState("Submit");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState([])
  const [variety, setVariety] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorClass, setErrorClass] = useState("errorText");

  const { swapList, setSwapList } = useContext(VeganContext);

  const handleInputSelect = (e, id) => {
    setSelectedIngredient(id);
    setTextValue(e.target.innerText);
    setOptions([]);
    setErrorMessage([]);
  };

  const handleSubmit = async (e) => {
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
      setDescription("");
      setVariety("");
      setName("");
      setTextValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (e) => {
    setErrorMessage(null);
    swapList &&
      setOptions(
        swapList.ingredients.filter(
          (option) =>
            option.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            (option.variety &&
              option.variety
                .toLowerCase()
                .includes(e.target.value.toLowerCase()))
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
        const response = await Axios.get("/nvIngredients");
        setSwapList(response.data.data);
        setFinishedRequest(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formValidation = (e) => {
    e.preventDefault();
    let validationPass = true;
    let nvIngredientExists = false;

    // Check if non-Vegan Ingredient is linked to something that is actually in the list
    swapList.ingredients.map((option) => {
      const name = option.name;
      let variety = "";
      if (option.variety) {
        variety = `, ${option.variety}`;
      }
      let combined = `${name}${variety}`;

      if (textValue.toString() === combined.toString()) {
        nvIngredientExists = true;
      }
    });

    if (!nvIngredientExists) {
      validationPass = false;
      setErrorClass("errorText");
      setErrorMessage(
        "There isn't a Non-Vegan ingredient of this variety, please add one on the Non-Vegan ingredient form"
      );
    }

    if (name === "") {
      validationPass = false;
      setErrorMessage("Please fill in the Name field");
      setErrorClass("errorText");
    }

    if (description === "") {
      validationPass = false;
      setErrorMessage("Please fill in the Description field");
      setErrorClass("errorText");
    }

    // how do I tell if the input of the form is

    // check that name is not null

    // add warning if no description is added

    if (validationPass) {
      handleSubmit();
    }
  };

  return (
    <>
      {finishedRequest ? (
        <form className="formContainer">
          {/* Error and Loading wheel */}
          {errorMessage && <p className="errorText">{errorMessage}</p>}
          {!finishedFormSubmit && <Spinner animation="border" />}

          {/* Main Form */}
          <h2 className="subHeadingSmall">Link</h2>
          <label className="formLabel">
            Choose a Non-Vegan Ingredient to link your alternative to:
            <SearchDropDown
              options={options}
              textValue={textValue}
              onInputChange={onInputChange}
              handleInputSelect={handleInputSelect}
              placeholder="Non-Vegan Ingredient Link"
              customClass="addScreen" /* btw, this is same as: className = addDropdown */
              customOptions="name"
              setVariety={true}
            />
          </label>
          <h2 className="subHeadingSmall">Add Ingredient</h2>
          <label className="formLabel">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage("");
              }}
              className="textInput"
              placeholder="e.g. Tofu"
            />
          </label>
          <label className="formLabel">
            Variety:
            <input
              type="text"
              value={variety}
              onChange={(e) => {
                setVariety(e.target.value);
              }}
              className="textInput"
              placeholder="e.g. Firm"
            />
          </label>
          <label className="formLabel">
            Description:
            <textarea
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrorMessage("");
              }}
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
            onClick={formValidation}
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
}

export default AddVeganIngredient;
