import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";

function Test() {
  const [selectedImage, setSelectedImage] = useState("");

  const handleClick = () => {
    console.log(selectedImage);
  };

  return (
    <div className="generalPage">
      <ImageUpload getImage={setSelectedImage} />
      <button type="button" onClick={handleClick}></button>
    </div>
  );
}

export default Test;
