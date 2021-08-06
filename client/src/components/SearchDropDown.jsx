import React, { useState, useEffect } from "react";

function SearchDropDown(props) {
  const {
    options,
    onInputChange,
    handleInputSelect,
    customClass,
    customOptions,
    setVariety,
    keyType,
  } = props;
  const [containerClass, setContainerClass] = useState("");
  const [listGroup, setListGroup] = useState("");
  const [resultList, setResultList] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    switch (customClass) {
      case "addScreen":
        setContainerClass("addPageSearchContainer");
        setListGroup("addPageSearchListGroup");
        setResultList("addPageSearchButton");
        setInput("addPageSearchInput");
        break;
      case "swapScreen":
        setContainerClass("swapPageSearchContainer");
        setListGroup("swapPageDropdownListGroup");
        setResultList("swapPageSearchButton");
        setInput("swapPageSearchInput");
        break;
      default:
        console.log("no customClass prop detected");
    }
  }, []);

  return (
    <div className={containerClass}>
      <input
        type="text"
        className={input}
        placeholder={props.placeholder}
        aria-label="InputSelect"
        onChange={onInputChange}
        value={props.textValue}
      />
      <ul className={listGroup}>
        {options &&
          options.map((item) => {
            return (
              item[customOptions] && (
                <button
                  type="button"
                  key={
                    customClass === "swapScreen" || keyType === "y"
                      ? `${item.id} ${item.type}`
                      : item.id
                  }
                  className={resultList}
                  onClick={(e) => handleInputSelect(e, item.id, item.type)}
                >
                  {item[customOptions]}
                  {item.variety && setVariety && `, ${item.variety}`}
                </button>
              )
            );
          })}
      </ul>
    </div>
  );
}

export default SearchDropDown;
