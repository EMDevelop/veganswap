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
  const [dropdownClass, setDropdownClass] = useState();
  const [showVariety, setShowVariety] = useState(null);

  useEffect(() => {
    switch (customClass) {
      case "addScreen":
        setDropdownClass("addDropdown");
        break;
      case "swapScreen":
        setDropdownClass("swapSearchBar");
        break;
      default:
        console.log("no customClass prop detected");
    }

    if (dropdownSelect === "ingredient") {
      setShowVariety(true);
    }
  }, []);

  return (
    <div className={dropdownClass}>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        aria-label="InputSelect"
        onChange={onInputChange}
        value={props.textValue}
      />
      <ul className="list-group">
        {options &&
          options.map((item) => {
            return (
              item[customOptions] && (
                <button
                  type="button"
                  key={item.id}
                  className="list-group-item list-group-item-action"
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
