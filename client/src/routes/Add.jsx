import React, { useState } from 'react';
import AddFoodProduct from '../components/add/AddFoodProduct';
import AddIngredient from '../components/add/AddIngredient';
import AddRecipe from '../components/add/AddRecipe';

// import SearchDropDown from '../components/SearchDropDown'

function Add() {
  const [addComponent, setAddComponent] = useState(<></>);
  const [dropdownSelect, setDropdownSelect] = useState('________');

  const onDropdownSelect = (e) => {
    setDropdownSelect(e.target.value);

    switch (e.target.value) {
      case 'Ingredient':
        setAddComponent(<AddIngredient />);
        break;
      case 'Recipe':
        setAddComponent(<AddRecipe />);
        break;
      case 'Suggested Product':
        setAddComponent(<AddFoodProduct />);
        break;
      default:
        break;
    }
  };

  return (
    <div className="generalPage">
      <div className="addHeader">
        <h2 className="swapSubHeader">I'd like to add a: </h2>
        <select
          className="swapDropdown"
          value={dropdownSelect}
          onChange={(e) => onDropdownSelect(e)}
        >
          <option disabled>________</option>
          <option value="Ingredient">Ingredient</option>
          <option value="Recipe">Recipe</option>
          <option value="Suggested Product">Suggested Product</option>
        </select>
      </div>
      {addComponent}
    </div>
  );
}

export default Add;
