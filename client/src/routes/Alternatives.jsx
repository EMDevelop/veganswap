import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../apis/axios";
import { VeganContext } from "../context/VeganContext";
import { Spinner } from "react-bootstrap";
import VeganIngredientAlternatives from "../components/VeganIngredientAlternatives";
import VeganRecipeAlternatives from "../components/VeganRecipeAlternatives";

function Alternatives() {
  const { id, type } = useParams();
  const [finishedLoading, setFinishedLoading] = useState(null);
  const { setAlternatives } = useContext(VeganContext);

  const [componentLoad, setComponentLoad] = useState([]);

  useEffect(() => {
    // Decide which component to load based on selection on SWAP route
    switch (type) {
      case "ingredient":
        setComponentLoad(<VeganIngredientAlternatives />);
        break;
      case "recipe":
        setComponentLoad(<VeganRecipeAlternatives />);
        break;
      default:
        console.log("Invalid Selection");
    }
    // fetch relevant data dependent on the selection on previous page
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/alternatives/${type}/${id}`);
        setAlternatives(response.data.data);
        console.log(response.data.data);
        setFinishedLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {finishedLoading ? (
        componentLoad
      ) : (
        <div className="spinnerContainer">
          <Spinner animation="border" />{" "}
        </div>
      )}
    </>
  );
}
export default Alternatives;
