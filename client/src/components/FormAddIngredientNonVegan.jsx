import React, { useState, useContext, useEffect } from "react";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import SearchDropDown from "./SearchDropDown";
import { Spinner } from "react-bootstrap";
import { print, capitaliseFirstLetter } from "../modules/helper.js";

function FormAddIngredientNonVegan() {
  const [buttonText, setButtonText] = useState("Submit");
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [nameOptions, setNameOptions] = useState([]);
  const [varietyOptions, setVarietyOptions] = useState([]);
  const [errorClass, setErrorClass] = useState("errorText");
  const [isNameSelected, setIsNameSelected] = useState(false);

  const { swapList, setSwapList } = useContext(VeganContext);

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

  const handleNameSelect = (e, id) => {
    setNameOptions([]);
    setName(e.target.innerText);
    setIsNameSelected(true);
    setErrorClass("warningText");
    setErrorMessage(
      "*  If the variety already exists for this ingredient name, you will need to use a unique variety"
    );
  };

  const handleVarietySelect = (e, id) => {
    if (isNameSelected) {
      setErrorClass("errorText");
      setErrorMessage(
        " Your selection already exists, would you like to add a vegan alternative Instead?"
      );
    }
  };

  const onNameInputChange = (e) => {
    setErrorMessage(null);
    let capVal = capitaliseFirstLetter(e.target.value);
    setName(capVal);

    setVarietyOptions([]);

    // Create a filtered search result list based on input
    let filteredNameList = swapList.ingredients.filter((option) =>
      option.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // create a distinct list of those values returned
    setNameOptions([
      ...new Map(filteredNameList.map((item) => [item["name"], item])).values(),
    ]);

    if (e.target.value === "") {
      setNameOptions([]);
      setVariety([]);
    }
  };

  // I need to pull back only those rows that

  const onVarietyInputChange = (e) => {
    setErrorMessage("");
    let capVal = capitaliseFirstLetter(e.target.value);
    setVariety(capVal);

    swapList &&
      setVarietyOptions(
        swapList.ingredients.filter((option) => option.name === name)
      );

    if (e.target.value === "") {
      setVarietyOptions("");
    }
  };

  const formValidation = (e) => {
    e.preventDefault();
    let nameDuplicate = false;
    let varietyDuplicate = false;
    let validationPass = true;

    swapList.ingredients.map((ingredient) => {
      if (ingredient.name.toLowerCase() === name.toLowerCase())
        nameDuplicate = true;
    });

    swapList.ingredients
      .filter((option) => option.name.toLowerCase().includes(name))
      .map((ingredient) => {
        if (
          ingredient.variety &&
          ingredient.variety.toLowerCase() === variety.toString().toLowerCase()
        )
          varietyDuplicate = true;
      });

    if (nameDuplicate && varietyDuplicate) {
      validationPass = false;
      setErrorMessage(
        "The Ingredient you are trying to submit already exists, would you like to add a vegan alternative Instead? "
      );
      setErrorClass("errorTextBold");
    }

    if (variety === "" && nameDuplicate) {
      validationPass = false;
      setErrorMessage(
        "The Ingredient you are trying to submit already exists, would you like to add a vegan alternative Instead?"
      );
      setErrorClass("errorTextBold");
    }

    if (variety === "" && name === "") {
      validationPass = false;
      setErrorMessage("Please fill in the Name field");
      setErrorClass("errorText");
    }

    if (validationPass) {
      handleSubmit();
    }

    // also, try and stop using State - I think the state isn't setting until after the validation happens.

    // I need to add a conditon here for if variety is empty, but there is already a "name" which has no variety.
  };

  const handleSubmit = async () => {
    try {
      setFinishedFormSubmit(false);
      setButtonText("Sending...");
      await Axios.post("/nvIngredient", {
        name,
        variety,
      });
      setButtonText("Sent!");
      setFinishedFormSubmit(true);
      setErrorMessage("Sent, thanks very much for contributing!");
      setErrorClass("successMessage");
    } catch (error) {
      console.log(error);
    }
    setVariety("");
    setVarietyOptions([]);
  };

  return finishedRequest ? (
    <form className="formContainer">
      {errorMessage && <p className={errorClass}>{errorMessage}</p>}
      {!finishedFormSubmit && <Spinner animation="border" />}
      <h2 className="subHeadingSmall">Add Ingredient</h2>
      <label className="formLabel">
        Name:
        <SearchDropDown
          options={nameOptions}
          textValue={name}
          handleInputSelect={handleNameSelect}
          onInputChange={onNameInputChange}
          placeholder="e.g. Cheese"
          customClass="addScreen" /* btw, this is same as: className = addDropdown */
          customOptions="name"
        />
      </label>

      <label className="formLabel">
        Variety:
        <SearchDropDown
          options={varietyOptions}
          textValue={variety}
          handleInputSelect={handleVarietySelect}
          onInputChange={onVarietyInputChange}
          placeholder="e.g. Cheese"
          customClass="addScreen" /* btw, this is same as: className = addDropdown */
          customOptions="variety"
        />
      </label>
      <div className="buttonContainer">
        <button
          onClick={formValidation}
          type="submit"
          className="formSubmitButton"
        >
          {buttonText}
        </button>
      </div>
    </form>
  ) : (
    <Spinner animation="border" />
  );
}

export default FormAddIngredientNonVegan;
