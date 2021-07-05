import React from 'react'



function SearchDropDown(props) {

    const {nonVegalList, onInputChange, handleInputSelect} = props;

    return (
        <div className="searchDropDown">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Choose an item to swap" 
                aria-label="Username" 
                onChange={onInputChange}
            />
            <ul className="list-group">
                {nonVegalList.map((item) => {
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
