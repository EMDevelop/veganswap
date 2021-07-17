import React, {useState, useEffect, useRef} from 'react'


function CollapsibleDiv(props) {

    const [isOpen, setIsOpen] = useState(false);
    const parentRef = useRef();

    useEffect(() => {
        const openOnLoad = () => {
            props.autoOpen === "yes" ? setIsOpen(true) : console.log('not expanding')
        }
        openOnLoad()

    }, [])


    return (
        <div className="collapsibleContainer">
            <div className="collapsible">
                <button 
                    className="collapsibleBannerButton" 
                    onClick={()=>{setIsOpen(!isOpen)}}  
                >
                    <div className="bannerLabel">
                    {props.label} 
                    </div>
                    <div className="bannerIcon">
                      <i className={isOpen? "fas fa-arrow-circle-up" : "fas fa-arrow-circle-down"} />
                    </div>   
                </button> 

                <div 
                    className="contentParent" 
                    ref={parentRef}
                    style={
                        isOpen 
                        ? { //This is the total height it should be (unhidden) + the px for style formatting
                            height: parentRef.current.scrollHeight + "px" 
                        }
                        : { //Hiding to 0 if the State is set to not open
                            height: "0px"
                        }
                    }
                >
                    <div className="content">
                        {props.children}
                    </div>      
                </div>
            </div>
        </div>
       
    )
}

export default CollapsibleDiv
