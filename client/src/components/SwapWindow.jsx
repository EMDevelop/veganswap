import React, { useContext, useEffect, useState } from "react";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { useHistory } from "react-router-dom";
import SearchDropDown from "./SearchDropDown";
import { Spinner } from "react-bootstrap";

function SwapWindow() {
  const { swapList, setSwapList } = useContext(VeganContext);
  const [finishedLoading, setFinishedLoading] = useState(null);
  const [setLabel, setSetLabel] = useState("ingredient");

  let history = useHistory();

  const handleInputSelect = (e, id) => {
    history.push(`/alternatives/${dropdownSelect}/${id}`);
  };

  useEffect(() => {
    if (dropdownSelect === "recipe") {
      setSetLabel("title");
    } else {
      setSetLabel("name");
    }

    const fetchData = async () => {
      try {
        const response = await Axios.get("/swapList");
        setSwapList(response.data.data);
        setFinishedLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [options, setOptions] = useState([]);
  const onInputChange = (e) => {
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
        break;
      case "recipe":
        setOptions(
          swapList.recipes.filter((option) =>
            option.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
        break;
      default:
        console.log("not a valid selection");
    }
  };

  const [dropdownSelect, setDropdownSelect] = useState("ingredient");

  const onDropdownSelect = (e) => {
    setDropdownSelect(e.target.value);
    if (e.target.value === "recipe") {
      setSetLabel("title");
    } else {
      setSetLabel("name");
    }
  };

  return (
    <div className="swapBox">
      <h1 className="mainPageHeader">Vegan Swap</h1>
      {finishedLoading ? (
        <div className="swapSearchBarContainer">
          <select
            className="swapDropdown"
            value={dropdownSelect}
            onChange={(e) => onDropdownSelect(e)}
          >
            <option value="ingredient">Ingredients</option>
            <option value="recipe">Recipes</option>
            <option disabled>Products</option>
          </select>
          {/* need to add  */}
          <SearchDropDown
            options={options}
            onInputChange={onInputChange}
            handleInputSelect={handleInputSelect}
            placeholder="Choose an item to swap"
            customClass="swapScreen"
            dropdownSelect={dropdownSelect}
            customOptions={setLabel}
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
