import React, { useState } from "react";

function ImageUpload(props) {
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      props.getImage(reader.result);
    };
  };

  return (
    <>
      <label className="formLabel">
        Image:
        <input
          type="file"
          name="uploadImage"
          onChange={handleFileInputChange}
          className="uploadImage"
        />
      </label>
      <div className="uploadPreviewImageContainer">
        {previewSource && (
          <img
            src={previewSource}
            alt="chosen"
            className="uploadPreviewImage"
          ></img>
        )}
      </div>
    </>
  );
}

export default ImageUpload;
