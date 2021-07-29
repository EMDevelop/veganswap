import React, { useState, useContext, useEffect } from "react";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import SearchDropDown from "./SearchDropDown";
import { Spinner } from "react-bootstrap";
import { print, capitaliseFirstLetter } from "../modules/helper.js";
import ImageUpload from "./ImageUpload";

// for showing images
import { Image } from "cloudinary-react";

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
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePublicID, setImagePublicID] = useState("");

  const { swapList, setSwapList } = useContext(VeganContext);

  //Images test
  const [imageIds, setImageIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/swapListVegan");
        setSwapList(response.data.data);

        // Images test
        const res = await Axios.get("/images");
        // const data = await res.json();
        setImageIds(res.data);

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
  //
  //
  //
  // Form Validation
  //
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
  const handleSubmit = async () => {
    setFinishedFormSubmit(false);
    setButtonText("Sending...");
    let publicID = "";

    // Image Upload
    try {
      const response = await Axios.post("/imageUpload", {
        data: selectedImage,
        headers: { "Content-type": "application.json" },
      });
      publicID = response.data.response.public_id;
    } catch (error) {
      print("Error Image Upload", error);
    }

    console.log(publicID);
    try {
      if (props.type === "ingredient") {
        const response = await Axios.post("/FoodProduct/Ingredient", {
          brandName,
          productName,
          description,
          selectedLink,
          publicID,
        });
      } else {
        // handle recipe API
        const response = await Axios.post("/FoodProduct/Recipe", {
          brandName,
          productName,
          description,
          selectedLink,
          publicID,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setErrorClass("successMessage");
    setErrorMessage("Sent, thanks very much for contributing!");
    setFinishedFormSubmit(true);
    setBrandName("");
    setProductName("");
    setTextValue("");
    setDescription("");
    setButtonText("Submit");
  };

  return finishedRequest ? (
    <form className="formContainer">
      {/* Image Test */}

      {imageIds &&
        imageIds.map((imageId, index) => (
          <Image
            key={index}
            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
            publicId={imageId}
            width="300"
            crop="scale"
          />
        ))}

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
    <Spinner animation="border" />
  );
}

export default FormAddFoodProduct;
