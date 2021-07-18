import React, { useState, useEffect, useRef } from "react";

function ToolTip(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toolRef = useRef();

  return (
    <div className="toolTip">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="toolButton"
      >
        <i className="fas fa-question-circle"></i>
      </button>

      <div
        className="toolExpanded"
        ref={toolRef}
        style={
          isOpen
            ? {
                //This is the total height it should be (unhidden) + the px for style formatting
                height: toolRef.current.scrollHeight + "px",
              }
            : {
                //Hiding to 0 if the State is set to not open
                // https://www.youtube.com/watch?v=4F8EYGao9pc&ab_channel=Devistry
                // 25 minutes in - solution for issue of overhanging ?
                height: "0px",
                backgroundColor: "white",
                border: "none",
              }
        }
      >
        {/* <div className="toolContent">{props.children}</div> */}
        {props.children}
      </div>
    </div>
  );
}

export default ToolTip;
