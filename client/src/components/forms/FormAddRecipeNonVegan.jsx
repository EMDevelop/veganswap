import React, { useState, useEffect, useContext } from 'react';
import Axios from '../../apis/axios';
import { VeganContext } from '../../context/VeganContext';
import SearchDropDown from '../SearchDropDown';
import { Spinner } from 'react-bootstrap';
import { capitaliseFirstLetter } from '../../modules/helper.js';

function FormAddRecipeNonVegan() {
  const [buttonText, setButtonText] = useState('Submit');
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [errorClass, setErrorClass] = useState('errorText');
  const [finishedRequest, setFinishedRequest] = useState(null);
  const [finishedFormSubmit, setFinishedFormSubmit] = useState(true);
  const [titleOptions, setTitleOptions] = useState([]);

  const { swapList, setSwapList } = useContext(VeganContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('/nvRecipes');
        // console.log(response);
        setSwapList(response.data.data);
        setFinishedRequest(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputSelect = (e, id) => {
    setTitleOptions([]);
    setTitle('');
    setErrorMessage(
      'Your selection already exists, would you like to add a vegan alternative Instead?'
    );
    setErrorClass('errorText');
  };

  const onInputChange = (e) => {
    setErrorMessage('');
    let capVal = capitaliseFirstLetter(e.target.value);
    setTitle(capVal);
    swapList &&
      setTitleOptions(
        swapList.Recipes.filter((option) =>
          option.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    if (e.target.value === '') {
      setTitleOptions([]);
    }
  };

  const formValidation = (e) => {
    e.preventDefault();
    let validationPass = true;
    let titleDuplicate = false;
    //  check that the value doesn't exist in the list
    swapList.Recipes.map((recipe) => {
      if (recipe.title.toLowerCase() === title.toString().toLowerCase())
        titleDuplicate = true;
    });

    if (titleDuplicate) {
      validationPass = false;
      setErrorMessage(
        'The Ingredient you are trying to submit already exists, would you like to add a vegan alternative Instead?'
      );
      setErrorClass('errorTextBold');
    }

    if (!title) {
      // If name field is empry, do not submit
      validationPass = false;
      setErrorMessage('Please fill in the Title field');
      setErrorClass('errorText');
    }

    if (validationPass) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setFinishedFormSubmit(false);
      setButtonText('Sending...');
      await Axios.post('/nvRecipe', {
        title,
      });
      setButtonText('Sent');
      setFinishedFormSubmit(true);
      setErrorClass('successMessage');
      setErrorMessage('Thanks very much for contributing!');
    } catch (error) {
      console.log(error);
    }
  };

  return finishedRequest ? (
    <form className="formContainer">
      {errorMessage && <p className={errorClass}>{errorMessage}</p>}
      {!finishedFormSubmit && <Spinner animation="border" />}
      <h2 className="subHeadingSmall">Add Non-Vegan Recipe</h2>

      <label className="formLabel">
        Title:
        <SearchDropDown
          options={titleOptions}
          textValue={title}
          onInputChange={onInputChange}
          handleInputSelect={handleInputSelect}
          placeholder={'e.g. Spagetti Bolognese'}
          customClass="addScreen"
          customOptions="title"
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

export default FormAddRecipeNonVegan;
