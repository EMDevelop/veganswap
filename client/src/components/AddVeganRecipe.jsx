import React, { useState, useContext, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { Spinner } from "react-bootstrap";

function AddVeganRecipe(props) {
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [buttonText, setButtonText] = useState("Submit");
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  // const [image, setImage] = useState([])
  const [errorMessage, setErrorMessage] = useState([]);
  const [credit, setCredit] = useState([]);
  const [creditURL, setCreditURL] = useState([]);
  const [textValue, setTextValue] = useState([]);

  const { swapList, setSwapList } = useContext(VeganContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedLink);
  };

  const handleInputSelect = (e, id) => {
    setSelectedLink(id);
    setTextValue(e.target.innerText);
    setOptions([]);
    setErrorMessage([]);
  };

  const onInputChange = (e) => {
    setTextValue(e.target.value);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/SwapList");
        setSwapList(response.data.data);
        setFinishedRequest(true);
        console.log(swapList);
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
              customOptions="title"
            />
          </label>
          <h2 className="subHeadingSmall">Add Recipe</h2>
          <label className="formLabel">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="textInput"
              placeholder="e.g. Tofu"
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
          <label className="formLabel">
            Credit Name:
            <input
              type="text"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
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
}

export default AddVeganRecipe;
