import React, { useState, useContext, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { Spinner } from "react-bootstrap";
import { print, capitaliseFirstLetter } from "../modules/helper.js";
import ImageUpload from "./ImageUpload";

function FormAddIngredientVegan() {
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [textValue, setTextValue] = useState([]);
  const [buttonText, setButtonText] = useState("Submit");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variety, setVariety] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorClass, setErrorClass] = useState("errorText");
  const [selectedImage, setSelectedImage] = useState("");

  const { swapList, setSwapList } = useContext(VeganContext);

  //
  //
  //
  // On Page Load
  //
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

  //
  //
  //
  // On Click / On Change Functions
  //
  const handleInputSelect = (e, id) => {
    setSelectedIngredient(id);
    setTextValue(e.target.innerText);
    setOptions([]);
    setErrorMessage([]);
  };

  const onInputChange = (e) => {
    let capVal = capitaliseFirstLetter(e.target.value);
    setTextValue(capVal);
    setErrorMessage("");
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

    if (e.target.value === "") {
      setOptions([]);
    }
  };

  //
  //
  //
  // Form Validation
  //
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

    if (!selectedImage) {
      validationPass = false;
      setErrorClass("errorText");
      setErrorMessage("No Image, Please Upload An Image");
    }

    if (validationPass) {
      handleSubmit();
    }
  };

  //
  //
  //
  // Submit Back End Request
  //
  const handleSubmit = async (e) => {
    setFinishedFormSubmit(false);
    setButtonText("Sending...");
    let publicID = "";

    try {
      const response = await Axios.post("/imageUpload", {
        data: selectedImage,
        headers: { "Content-type": "application.json" },
      });
      publicID = response.data.response.public_id;
    } catch (error) {
      console.log(error);
    }

    try {
      const veganIngredient = await Axios.post("/vIngredient", {
        name,
        variety,
        description,
        selectedIngredient,
        publicID,
      });
      setErrorClass("successMessage");
      setErrorMessage("Sent, thanks very much for contributing!");
      setButtonText("Submit");
      setFinishedFormSubmit(true);
      setDescription("");
      setVariety("");
      setName("");
      setTextValue("");
      setSelectedImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {finishedRequest ? (
        <form className="formContainer">
          {/* Error and Loading wheel */}
          {errorMessage && <p className={errorClass}>{errorMessage}</p>}
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
                let capVal = capitaliseFirstLetter(e.target.value);
                setName(capVal);
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
                let capVal = capitaliseFirstLetter(e.target.value);
                setVariety(capVal);
                setErrorMessage("");
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
                let capVal = capitaliseFirstLetter(e.target.value);
                setDescription(capVal);
                setErrorMessage("");
              }}
              className="textInputArea"
              placeholder="e.g. Tofu, also known as bean curd, is a food prepared by coagulating soy milk and then pressing the resulting curds into solid white blocks of varying softness..."
            />
          </label>

          <ImageUpload getImage={setSelectedImage} />

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
        <div className="spinnerContainer">
          <Spinner animation="border" />{" "}
        </div>
      )}
    </>
  );
}

export default FormAddIngredientVegan;
