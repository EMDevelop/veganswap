import React, { useState, useContext, useEffect } from 'react';
import SearchDropDown from './SearchDropDown';
import Axios from '../apis/axios';
import { VeganContext } from '../context/VeganContext';
import { Spinner } from 'react-bootstrap';
import { capitaliseFirstLetter } from '../modules/helper.js';
import ImageUpload from './images/ImageUpload';
import MultiFormAddIngredients from './MultiFormAddIngredients';
import MultiFormAddSteps from './MultiFormAddSteps';

function FormAddRecipeVegan(props) {
  const [buttonText, setButtonText] = useState('Submit');
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorClass, setErrorClass] = useState('errorText');
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [credit, setCredit] = useState([]);
  const [creditURL, setCreditURL] = useState('');
  const [textValue, setTextValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [childToParentIngredients, setChildToParentIngredients] = useState('');
  const [childToParentSteps, setChildToParentSteps] = useState('');

  const { swapList, setSwapList } = useContext(VeganContext);

  //
  //
  //
  // On Page Load
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('/SwapList');
        setSwapList(response.data.data);
        console.log(response.data.data);
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
    setSelectedLink(id);
    setTextValue(e.target.innerText);
    setOptions([]);
    setErrorMessage([]);
  };

  const onInputChange = (e) => {
    let capVal = capitaliseFirstLetter(e.target.value);
    setTextValue(capVal);
    setErrorMessage('');
    if (props.type === 'ingredient') {
      swapList &&
        setOptions(
          swapList.swapList.filter(
            (option) =>
              option.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) &&
              option.type == 'ingredient'
          )
        );
    } else {
      swapList &&
        setOptions(
          swapList.swapList.filter(
            (option) =>
              option.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) &&
              option.type == 'recipe'
          )
        );
    }
    if (e.target.value === '') {
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
    let nvRecipeExists = false;

    if (props.type === 'ingredient') {
      nvRecipeExists = true;
      swapList.swapList.map((option) => {
        const name = option.name;
        let variety = '';
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
      nvIngredientExists = true;
      swapList.swapList.map((option) => {
        if (
          textValue.toString().toLowerCase() ===
          option.name.toString().toLowerCase()
        ) {
          nvRecipeExists = true;
        }
      });
    }
    // outcome A
    if (!nvRecipeExists) {
      validationPass = false;
      setErrorClass('errorText');
      setErrorMessage(
        "There isn't a Non-Vegan recipe of this variety, please add one on the Non-Vegan ingredient form"
      );
    }
    if (!nvIngredientExists) {
      validationPass = false;
      setErrorClass('errorText');
      setErrorMessage(
        "There isn't a Non-Vegan ingredient of this variety, please add one on the Non-Vegan ingredient form"
      );
    }
    //Check Dropdowns
    if (!title) {
      validationPass = false;
      setErrorMessage('Please fill in the Title field');
      setErrorClass('errorText');
    }
    // Empty Fields
    if (!textValue) {
      validationPass = false;
      setErrorMessage('Please fill in the Link field');
      setErrorClass('errorText');
    }
    if (!description) {
      validationPass = false;
      setErrorMessage('Please fill in the Description field');
      setErrorClass('errorText');
    }
    if (!credit) {
      validationPass = false;
      setErrorMessage('Please fill in the Credit field');
      setErrorClass('errorText');
    }
    if (!creditURL) {
      validationPass = false;
      setErrorMessage('Please fill in the Credit URL field');
      setErrorClass('errorText');
    }
    if (!selectedImage) {
      validationPass = false;
      setErrorClass('errorText');
      setErrorMessage('No Image, Please Upload An Image');
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
    setButtonText('Sending...');
    let publicID = '';

    // Image Upload
    try {
      const response = await Axios.post('/imageUpload', {
        data: selectedImage,
        headers: { 'Content-type': 'application.json' },
      });
      publicID = response.data.response.public_id;
    } catch (error) {
      console.log(error);
    }

    try {
      if (props.type === 'ingredient') {
        await Axios.post('/vRecipe/Ingredient', {
          title,
          description,
          credit,
          creditURL,
          selectedLink,
          publicID,
          childToParentIngredients,
          childToParentSteps,
        });
      } else {
        // removed const see if it works
        await Axios.post('/vRecipe/Recipe', {
          title,
          description,
          credit,
          creditURL,
          selectedLink,
          publicID,
          childToParentIngredients,
          childToParentSteps,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setErrorClass('successMessage');
    setErrorMessage('Sent, thanks very much for contributing!');
    setFinishedFormSubmit(true);
    setTitle('');
    setTextValue('');
    setCreditURL('');
    setCredit('');
    setDescription('');
    setButtonText('Submit');
    setSelectedImage('');
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
              keyType="y"
              customOptions={'name'}
              setVariety={props.variety}
            />
          </label>
          <h2 className="subHeadingSmall">Add Vegan Recipe</h2>
          <label className="formLabel">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => {
                let capVal = capitaliseFirstLetter(e.target.value);
                setTitle(capVal);
                setErrorMessage('');
              }}
              className="textInput"
              placeholder="e.g. Tofu"
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
                setErrorMessage('');
              }}
              className="textInputArea"
              placeholder="e.g. Tofu, also known as bean curd, is a food prepared by coagulating soy milk and then pressing the resulting curds into solid white blocks of varying softness..."
            />
          </label>
          <label className="formLabel">
            Credit Name:
            <input
              type="text"
              value={credit}
              onChange={(e) => {
                let capVal = capitaliseFirstLetter(e.target.value);
                setCredit(capVal);
                setErrorMessage('');
              }}
              className="textInput"
              placeholder="e.g. John Doe"
            />
          </label>
          <label className="formLabel">
            Credit URL:
            <input
              type="text"
              value={creditURL}
              onChange={(e) => {
                setCreditURL(e.target.value);
                setErrorMessage('');
              }}
              className="textInputURL"
              placeholder="e.g. www.foodwebsite.com/recipe/johndoe/tofu"
            />
          </label>
          <ImageUpload getImage={setSelectedImage} />
          <h2 className="subHeadingSmall">Add Ingredients</h2>
          <MultiFormAddIngredients
            passChildData={setChildToParentIngredients}
          />
          <h2 className="subHeadingSmall">Add Steps</h2>
          <MultiFormAddSteps passChildData={setChildToParentSteps} />
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
          <Spinner animation="border" />{' '}
        </div>
      )}
    </>
  );
}

export default FormAddRecipeVegan;
