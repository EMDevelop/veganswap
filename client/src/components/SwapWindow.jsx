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
  const [options, setOptions] = useState("");
  const [dropdownSelect, setDropdownSelect] = useState("________");
  const [textValue, setTextValue] = useState("");

  let history = useHistory();

  const handleInputSelect = (e, id, type) => {
    console.log(type);

    history.push(`/alternatives/${type}/${id}`);
  };

  useEffect(() => {
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
    let capVal = capitaliseFirstLetter(e.target.value);
    setTextValue(capVal);
    if (e.target.value === "") setOptions("");
    console.log(swapList);
    swapList &&
      setOptions(
        swapList.swapList.filter((option) =>
          option.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
  };

  return (
    <div>
      <h1 className="mainPageHeader">Vegan Swap</h1>
      {finishedLoading ? (
        <div className="swapSearchBarContainer">
          <h2 className="swapSubHeader">Show vegan alternatives for</h2>
          <SearchDropDown
            options={options}
            onInputChange={onInputChange}
            handleInputSelect={handleInputSelect}
            placeholder="________"
            textValue={textValue}
            customClass="swapScreen"
            dropdownSelect={dropdownSelect}
            customOptions="name"
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
