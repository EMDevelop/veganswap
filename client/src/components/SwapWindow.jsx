import React, { useContext, useEffect, useState } from "react";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { useHistory } from "react-router-dom";
import SearchDropDown from "./SearchDropDown";
import { Spinner } from "react-bootstrap";
import { print, capitaliseFirstLetter } from "../modules/helper.js";

function SwapWindow() {
  const { swapList, setSwapList } = useContext(VeganContext);
  const [finishedLoading, setFinishedLoading] = useState(null);
  const [label, setLabel] = useState("ingredient");
  const [options, setOptions] = useState("");
  const [dropdownSelect, setDropdownSelect] = useState("________");
  const [textValue, setTextValue] = useState("");

  let history = useHistory();

  const handleInputSelect = (id) => {
    history.push(`/alternatives/${dropdownSelect}/${id}`);
  };

  useEffect(() => {
    if (dropdownSelect === "recipe") {
      setLabel("title");
    } else {
      setLabel("name");
    }
    const fetchData = async () => {
      try {
        const response = await Axios.get("/swapList");
        setSwapList(response.data.data);
        console.log(response.data.data);
        setFinishedLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onInputChange = (e) => {
    setTextValue(capitaliseFirstLetter(e.target.value));

    switch (dropdownSelect) {
      // We need to change this filter so it searches for both option.name and option.
      case "ingredient":
        setOptions(
          swapList.ingredients.filter(
            (option) =>
              option.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              (option.variety &&
                option.variety
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()))
          )
        );
        if (e.target.value === "") setOptions([]);
        break;
      case "recipe":
        setOptions(
          swapList.recipes.filter((option) =>
            option.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
        if (e.target.value === "") setOptions([]);
        break;
      default:
        console.log("not a valid selection");
    }
  };

  const onDropdownSelect = (e) => {
    setDropdownSelect(e.target.value);
    if (e.target.value === "recipe") {
      setLabel("title");
    } else {
      setLabel("name");
    }
  };

  return (
    <div className="swapBox">
      <h1 className="mainPageHeader">Vegan Swap</h1>
      {finishedLoading ? (
        <div className="swapSearchBarContainer">
          <h2 className="swapSubHeader">Show vegan alternatives for</h2>
          <select
            className="swapDropdown"
            value={dropdownSelect}
            onChange={(e) => onDropdownSelect(e)}
          >
            <option disabled>________</option>
            <option value="ingredient">Ingredient</option>
            <option value="recipe">Recipe</option>
            <option disabled>Products</option>
          </select>
          <h2 className="swapSubHeader">|</h2>

          <SearchDropDown
            options={options}
            onInputChange={onInputChange}
            handleInputSelect={handleInputSelect}
            placeholder="________"
            textValue={textValue}
            customClass="swapScreen"
            dropdownSelect={dropdownSelect}
            customOptions={label}
            setVariety={true}
          />
        </div>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}

export default SwapWindow;
