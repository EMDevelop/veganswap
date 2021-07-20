import React, { useState, useContext, useEffect } from "react";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import SearchDropDown from "./SearchDropDown";
import { Spinner } from "react-bootstrap";

function AddNonVeganIngredient() {
  const [buttonText, setButtonText] = useState("Submit");
  const [name, setName] = useState([]);
  const [variety, setVariety] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [nameOptions, setNameOptions] = useState([]);
  const [varietyOptions, setVarietyOptions] = useState([]);
  const [errorClass, setErrorClass] = useState("errorText");
  const [isNameSelected, setIsNameSelected] = useState(false);
  const [duplicateName, setDuplicateName] = useState(null);
  const [duplicateVariety, setDuplicateVariety] = useState(null);

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
      "*  If the variety already exists for this ingredient name, please do not duplicate existing entries"
    );
  };

  const handleVarietySelect = (e, id) => {
    if (isNameSelected) {
      setErrorClass("errorText");
      setErrorMessage(
        "  * The ingredient you're trying to add already exists, please add something unique"
      );
    }
  };

  const onNameInputChange = (e) => {
    setErrorMessage(null);
    setDuplicateName(null);
    setName(e.target.value);
    setVarietyOptions([]);
    swapList &&
      setNameOptions(
        swapList.ingredients.filter((option) =>
          option.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );

    if (e.target.value === "") {
      setNameOptions([]);
      setVariety([]);
    }
  };

  // I need to pull back only those rows that

  console.log(duplicateVariety);
  console.log(variety);

  const onVarietyInputChange = (e) => {
    // ----------------------------------------------

    // setDuplicateVariety(null);
    setVariety(e.target.value);
    swapList &&
      setVarietyOptions(
        swapList.ingredients.filter((option) => option.name === name)
      );

    if (e.target.value === "") {
      setVarietyOptions([]);
    }
  };

  const formValidation = (e) => {
    //  -------------------------------------------
    console.log(duplicateVariety);
    console.log(variety);

    e.preventDefault();
    swapList.ingredients.map((ingredient) => {
      if (ingredient.name.toLowerCase() === name.toString().toLowerCase())
        setDuplicateName(true);
    });

    swapList.ingredients.map((ingredient) => {
      if (
        ingredient.variety &&
        ingredient.variety.toLowerCase() === variety.toString().toLowerCase()
      )
        setDuplicateVariety(true);

      if (duplicateName && duplicateVariety) {
        console.log("same");
      } else {
        console.log("not same");
      }
    });

    // also, try and stop using State - I think the state isn't setting until after the validation happens.

    // I need to add a conditon here for if variety is empty, but there is already a "name" which has no variety.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  -------------------------------------------
    console.log(duplicateVariety);

    //   setErrorClass("errorTextBold");
    //   setErrorMessage(
    //     "The Ingredient you are trying to submit already exists!"
    //   );
    // } else {
    //   console.log(name);
    //   console.log(duplicateName);
    //   console.log(variety);
    //   console.log(duplicateVariety);
    //   console.log("this happened you sausage");
    // }

    // try {
    //   setFinishedFormSubmit(false);
    //   setButtonText("Sending...");
    //   await Axios.post("/nvIngredient", {
    //     name,
    //     variety,
    //   });
    //   setButtonText("Sent");
    //   setFinishedFormSubmit(true);
    //   setName([]);
    //   setVariety([]);
    // } catch (error) {
    //   console.log(error);
    // }
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
      <button
        onClick={formValidation}
        type="submit"
        className="btn btn-primary"
      >
        {buttonText}
      </button>
    </form>
  ) : (
    <Spinner animation="border" />
  );
}

export default AddNonVeganIngredient;
