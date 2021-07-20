import React, { useState, useEffect } from "react";

import Axios from "../apis/axios";

function AddNonVeganRecipe() {
  const [buttonText, setButtonText] = useState("Submit");
  const [title, setTitle] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setButtonText("Sending...");
      await Axios.post("/nvRecipe", {
        title,
      });
      setButtonText("Sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="formContainer">
      <h2 className="subHeadingSmall">Add Recipe</h2>
      <label className="formLabel">
        Name:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="textInput"
          placeholder="e.g. Cheese"
        />
      </label>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
}

export default AddNonVeganRecipe;
