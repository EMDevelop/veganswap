import React, { useState, useEffect } from "react";

function SearchDropDown(props) {
  const {
    options,
    onInputChange,
    handleInputSelect,
    customClass,
    customOptions,
    dropdownSelect,
    setVariety,
  } = props;
  const [containerClass, setContainerClass] = useState("");
  const [listGroup, setListGroup] = useState("");
  const [resultList, setResultList] = useState("");
  const [input, setInput] = useState("");

  const [showVariety, setShowVariety] = useState(null);

  useEffect(() => {
    switch (customClass) {
      case "addScreen":
        setContainerClass("swapPageSearchContainer");
        setListGroup("addPageSearchListGroup");
        setResultList("addPageSearchtButton");
        setInput("addPageSearchInput");
        break;
      case "swapScreen":
        setContainerClass("swapPageSearchContainer");
        setListGroup("swapPageDropdownListGroup");
        setResultList("swapPageSearchtButton");
        setInput("swapPageSearchInput");
        break;
      default:
        console.log("no customClass prop detected");
    }

    if (dropdownSelect === "ingredient") {
      setShowVariety(true);
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
                  key={item.id}
                  className={resultList}
                  onClick={(e) => handleInputSelect(e, item.id)}
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
