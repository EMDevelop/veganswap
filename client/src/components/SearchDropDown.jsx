import React, {useState, useEffect} from 'react'



function SearchDropDown(props) {

    const {options, onInputChange, handleInputSelect} = props;
    const [dropdownClass, setDropdownClass] = useState()


    useEffect(() => {
        switch(props.customClass) {
            case 'addScreen':
                setDropdownClass("addDropdown")
            break;
            case 'swapScreen':
                setDropdownClass("swapDropdown")
            break;
            default:
            console.log("no customClass prop detected")
        }
    }, [])

   
    return (
        <div className={dropdownClass}>
            <input 
                type="text" 
                className="form-control" 
                placeholder={props.placeholder}
                aria-label="Username" 
                onChange={onInputChange}
            />
            <ul className="list-group">
                {options && options.map((item) => {
                    return (
                    <button type="button" key ={item.id} className="list-group-item list-group-item-action" onClick={(e) => handleInputSelect(e,item.id)}>
                        {item.name}
                    </button>
                    )
                })}
            </ul>


        </div>
    )
}

export default SearchDropDown
