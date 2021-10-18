import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../apis/axios';
import { VeganContext } from '../context/VeganContext';
import { Spinner } from 'react-bootstrap';
import VeganIngredientAlternatives from '../components/alternativeScreen/VeganIngredientAlternatives';
import VeganRecipeAlternatives from '../components/alternativeScreen/VeganRecipeAlternatives';

function Alternatives() {
  const { id, type } = useParams();
  const [finishedLoading, setFinishedLoading] = useState(null);
  const { setAlternatives } = useContext(VeganContext);

  const [componentLoad, setComponentLoad] = useState([]);

  useEffect(() => {
    console.log('Client: useEffect called Alternatives.jsx');

    // Decide which component to load based on selection on SWAP route
    switch (type) {
      case 'ingredient':
        setComponentLoad(<VeganIngredientAlternatives />);
        break;
      case 'recipe':
        setComponentLoad(<VeganRecipeAlternatives />);
        break;
      default:
        console.log('Invalid Selection');
    }
    // fetch relevant data dependent on the selection on previous page

    console.log('Cliebt: Fetch in Alternatives.jsx about to begin');

    const fetchData = async () => {
      try {
        console.log('Client: begginning try catch, Alternatives.jsx');
        console.log(`type = ${type}`);
        console.log(`id = ${id}`);
        console.log(Axios);
        const response = await Axios.get(`/alternatives/${type}/${id}`);
        console.log('Client: fetch complete Alternatives.jsxs');
        setAlternatives(response.data.data);
        setFinishedLoading(true);
        console.log('Client: finished Axios request, Alternatives.jsx');
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
          <Spinner animation="border" />{' '}
        </div>
      )}
    </>
  );
}
export default Alternatives;
