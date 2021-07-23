import React, { useState, useContext, useEffect } from "react";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import SearchDropDown from "./SearchDropDown";
import { Spinner } from "react-bootstrap";
import { print, capitaliseFirstLetter } from "../modules/helper.js";

function FormAddFoodProduct(props) {
  const [buttonText, setButtonText] = useState("Submit");
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorClass, setErrorClass] = useState("errorText");
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [textValue, setTextValue] = useState("");
  const { swapList, setSwapList } = useContext(VeganContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/swapListVegan");
        setSwapList(response.data.data);
        setFinishedRequest(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputSelect = (e, id) => {
    setSelectedLink(id);
    setTextValue(e.target.innerText);
    setOptions([]);
    setErrorMessage([]);
  };

  const onInputChange = (e) => {
    setErrorMessage("");
    let capVal = capitaliseFirstLetter(e.target.value);
    setTextValue(capVal);
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

  const formValidation = (e) => {
    e.preventDefault();
    let validationPass = true;
    let vIngredientExists = false;
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
          vIngredientExists = true;
        }
      });
    } else {
      // if props = recipe
      vIngredientExists = true;
      swapList.recipes.map((option) => {
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
        "There isn't a Non-Vegan recipe of this variety, please add one on the Non-Vegan Ingredient form"
      );
    }
    if (!vIngredientExists) {
      validationPass = false;
      setErrorClass("errorText");
      setErrorMessage(
        "There isn't a Vegan ingredient of this variety, please add one on the Vegan Ingredient form"
      );
    }
    // Empty Fields
    if (!brandName) {
      validationPass = false;
      setErrorMessage("Please fill in the Brand Name field");
      setErrorClass("errorText");
    }
    if (!productName) {
      validationPass = false;
      setErrorMessage("Please fill in the Product Name field");
      setErrorClass("errorText");
    }
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

    if (validationPass) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log("submit ran");
    setFinishedFormSubmit(false);
    // setButtonText("Sending...");

    // Testing Image Upload
    handleSubmitFile();

    // try {
    //   if (props.type === "ingredient") {
    //     const response = await Axios.post("/FoodProduct/Ingredient", {
    //       brandName,
    //       productName,
    //       description,
    //       selectedLink,
    //     });
    //   } else {
    //     // handle recipe API
    //     const response = await Axios.post("/FoodProduct/Recipe", {
    //       brandName,
    //       productName,
    //       description,
    //       selectedLink,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // setErrorClass("successMessage");
    // setErrorMessage("Sent, thanks very much for contributing!");
    setFinishedFormSubmit(true);
    // setBrandName("");
    // setProductName("");
    // setTextValue("");
    // setDescription("");
    // setButtonText("Submit");
  };

  // Image
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    if (!previewSource) {
      setErrorClass("errorClass");
      setErrorMessage("No Image, Please Upload An Image");
      return;
    }

    uploadImage(previewSource);
  };

  const uploadImage = async (imageText) => {
    try {
      const response = await Axios.post("/imageUpload", {
        data: JSON.stringify({ data: imageText }),
        headers: { "Content-type": "application.json" },
      });
      print("imageUploadResponse", response);
    } catch (error) {
      print("Error Image Upload", error);
    }
  };

  return finishedRequest ? (
    <form className="formContainer">
      {errorMessage && <p className={errorClass}>{errorMessage}</p>}
      {/* {!finishedFormSubmit && <Spinner animation="border" />} */}
      <h2 className="subHeadingSmall">Link</h2>
      <label className="formLabel">
        {`Choose which ${
          props.type === "ingredient" ? "Vegan Ingredient" : "Non-Vegan Recipe"
        } to link your recipe to:`}
        <SearchDropDown
          options={options}
          textValue={textValue}
          onInputChange={onInputChange}
          handleInputSelect={handleInputSelect}
          placeholder={`${
            props.type === "ingredient"
              ? "Vegan Ingredient"
              : "Non-Vegan Recipe"
          } link`}
          customClass="addScreen"
          customOptions={props.customOptions}
          setVariety={props.variety}
        />
      </label>
      <h2 className="subHeadingSmall">Add Branded Product</h2>
      {/* Add BrandName, Product Name, Description, Image */}
      <label className="formLabel">
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => {
            let capVal = capitaliseFirstLetter(e.target.value);
            setProductName(capVal);
          }}
          className="textInput"
          placeholder="e.g. Tomato Ketchup"
        />
      </label>
      <label className="formLabel">
        Brand Name:
        <input
          type="text"
          value={brandName}
          onChange={(e) => {
            let capVal = capitaliseFirstLetter(e.target.value);
            setBrandName(capVal);
          }}
          className="textInput"
          placeholder="e.g. Heinz"
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
          }}
          className="textInputArea"
          placeholder="e.g. Tofu, also known as bean curd, is a food prepared by coagulating soy milk and then pressing the resulting curds into solid white blocks of varying softness..."
        />
      </label>

      <label className="formLabel">
        Image:
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          className="uploadImage"
          value={selectedFile}
        />
      </label>
      <div className="uploadPreviewImageContainer">
        {previewSource && (
          <img
            src={previewSource}
            alt="chosen"
            className="uploadPreviewImage"
          ></img>
        )}
      </div>
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

export default FormAddFoodProduct;
