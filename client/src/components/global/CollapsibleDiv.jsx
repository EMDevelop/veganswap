import React, { useState, useEffect, useRef } from "react";

function CollapsibleDiv(props) {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef(null);
  const childRef = useRef(null);

  // Hopefully auto change height based on contents

  useEffect(() => {
    const openOnLoad = () => {
      props.autoOpen === "yes" ? setIsOpen(true) : console.log("not expanding");
    };
    openOnLoad();
  }, []);

  return (
    <div className="collapsibleContainer">
      <div className="collapsible">
        <button
          className="collapsibleBannerButton"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="bannerLabel">{props.label}</div>
          <div className="bannerIcon">
            <i
              className={
                isOpen ? "fas fa-arrow-circle-up" : "fas fa-arrow-circle-down"
              }
            />
          </div>
        </button>

        <div
          className="contentParent"
          ref={parentRef}
          style={
            isOpen
              ? {
                  height: "auto",
                }
              : {
                  height: "0px",
                }
          }
        >
          <div className="content" ref={childRef}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollapsibleDiv;
