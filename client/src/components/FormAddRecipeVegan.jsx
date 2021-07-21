import React, { useState, useContext, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { Spinner } from "react-bootstrap";
import { print, capitaliseFirstLetter } from "../modules/helper.js";

function FormAddRecipeVegan(props) {
  const [buttonText, setButtonText] = useState("Submit");
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorClass, setErrorClass] = useState("errorText");
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState([])

  const [credit, setCredit] = useState([]);
  const [creditURL, setCreditURL] = useState("");
  const [textValue, setTextValue] = useState("");
  // const [customOptions, setCustomOptions] = useState("");

  const { swapList, setSwapList } = useContext(VeganContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/SwapList");
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
    let nvRecipeExists = false;

    // Check that value entered is in the dropdown list

    if (props.type === "ingredient") {
      // if props = ingredient (see Outcome A)
      nvRecipeExists = true;
      swapList.ingredients.map((option) => {
        const name = option.name;
        let variety = "";
        if (option.variety) {
          variety = `, ${option.variety}`;
        }
        let combined = `${name}${variety}`;

        if (
          textValue.toString().toLowerCase() ===
          combined.toString().toLowerCase()
        ) {
          nvIngredientExists = true;
        }
      });
    } else {
      // if props = recipe

      nvIngredientExists = true;
      swapList.recipes.map((option) => {
        // console.log(textValue.toString().toLowerCase());
        // console.log(option.textValue.toString().toLowerCase());
        if (
          textValue.toString().toLowerCase() ===
          option.title.toString().toLowerCase()
        ) {
          nvRecipeExists = true;
        }
      });
    }
    // outcome A
    if (!nvRecipeExists) {
      validationPass = false;
      setErrorClass("errorText");
      setErrorMessage(
        "There isn't a Non-Vegan recipe of this variety, please add one on the Non-Vegan ingredient form"
      );
    }
    if (!nvIngredientExists) {
      validationPass = false;
      setErrorClass("errorText");
      setErrorMessage(
        "There isn't a Non-Vegan ingredient of this variety, please add one on the Non-Vegan ingredient form"
      );
    }
    //Check Dropdowns
    if (!title) {
      validationPass = false;
      setErrorMessage("Please fill in the Title field");
      setErrorClass("errorText");
    }
    // Empty Fields
    if (!textValue) {
      validationPass = false;
      setErrorMessage("Please fill in the Link field");
      setErrorClass("errorText");
    }
    if (!description) {
      validationPass = false;
      setErrorMessage("Please fill in the Description field");
      setErrorClass("errorText");
    }
    if (!credit) {
      validationPass = false;
      setErrorMessage("Please fill in the Credit field");
      setErrorClass("errorText");
    }
    if (!creditURL) {
      validationPass = false;
      setErrorMessage("Please fill in the Credit URL field");
      setErrorClass("errorText");
    }
    if (validationPass) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log("submit ran");
    setFinishedFormSubmit(false);
    setButtonText("Sending...");
    try {
      if (props.type === "ingredient") {
        const response = await Axios.post("/vRecipe/Ingredient", {
          title,
          description,
          credit,
          creditURL,
          selectedLink,
        });
      } else {
        // handle recipe API
        const response = await Axios.post("/vRecipe/Recipe", {
          title,
          description,
          credit,
          creditURL,
          selectedLink,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setErrorClass("successMessage");
    setErrorMessage("Sent, thanks very much for contributing!");
    setFinishedFormSubmit(true);
    setTitle("");
    setTextValue("");
    setCreditURL("");
    setCredit("");
    setDescription("");
    setButtonText("Submit");
  };

  const handleInputSelect = (e, id) => {
    setSelectedLink(id);
    setTextValue(e.target.innerText);
    setOptions([]);
    setErrorMessage([]);
  };

  const onInputChange = (e) => {
    setTextValue(capitaliseFirstLetter(e.target.value));

    if (props.type === "ingredient") {
      swapList &&
        setOptions(
          swapList.ingredients.filter((option) =>
            option.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
    } else {
      swapList &&
        setOptions(
          swapList.recipes.filter((option) =>
            option.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
    }
    if (e.target.value === "") {
      setOptions([]);
    }
  };

  return (
    <>
      {finishedRequest ? (
        <form className="formContainer">
          {/* Error and Loading wheel */}
          {errorMessage && <p className={errorClass}>{errorMessage}</p>}
          {!finishedFormSubmit && <Spinner animation="border" />}

          {props.link}
          {/* Main Form */}
          <h2 className="subHeadingSmall">Link</h2>
          <label className="formLabel">
            {`Choose which non-vegan ${props.type} to link your recipe to:`}
            <SearchDropDown
              options={options}
              textValue={textValue}
              onInputChange={onInputChange}
              handleInputSelect={handleInputSelect}
              placeholder={`Non-Vegan ${props.type} Link`}
              customClass="addScreen"
              customOptions={props.customOptions}
              setVariety={props.variety}
            />
          </label>
          <h2 className="subHeadingSmall">Add Vegan Recipe</h2>
          <label className="formLabel">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(capitaliseFirstLetter(e.target.value))}
              className="textInput"
              placeholder="e.g. Tofu"
            />
          </label>
          <label className="formLabel">
            Description:
            <textarea
              type="text"
              value={description}
              onChange={(e) =>
                setDescription(capitaliseFirstLetter(e.target.value))
              }
              className="textInputArea"
              placeholder="e.g. Tofu, also known as bean curd, is a food prepared by coagulating soy milk and then pressing the resulting curds into solid white blocks of varying softness..."
            />
          </label>
          <label className="formLabel">
            Credit Name:
            <input
              type="text"
              value={credit}
              onChange={(e) => setCredit(capitaliseFirstLetter(e.target.value))}
              className="textInput"
              placeholder="e.g. John Doe"
            />
          </label>
          <label className="formLabel">
            Credit URL:
            <input
              type="text"
              value={creditURL}
              onChange={(e) => setCreditURL(e.target.value)}
              className="textInputURL"
              placeholder="e.g. www.foodwebsite.com/recipe/johndoe/tofu"
            />
          </label>
          {/*  needs some work */}
          <label className="formLabel">
            Image:
            <input type="file" className="uploadImage" />
          </label>
          <h2 className="subHeadingSmall">Add Ingredients</h2>
          <h2 className="subHeadingSmall">Add Steps</h2>
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

export default FormAddRecipeVegan;
