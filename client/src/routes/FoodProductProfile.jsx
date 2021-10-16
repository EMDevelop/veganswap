import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../apis/axios';
import { VeganContext } from '../context/VeganContext';
import { Spinner } from 'react-bootstrap';
import ProfileCard from '../components/cards/ProfileCard';

function FoodProductProfile() {
  const { id } = useParams();
  const { foodProduct, setFoodProduct, setProfileType } =
    useContext(VeganContext);
  const [finishedLoading, setFinishedLoading] = useState(null);

  useEffect(() => {
    setProfileType('foodProduct');
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/foodproducts/profile/${id}`);
        console.log(response.data.data);
        setFoodProduct(response.data.data);
        setFinishedLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="generalPage">
      {finishedLoading ? (
        <ProfileCard
          image={foodProduct.FoodProduct.image}
          title={foodProduct.FoodProduct.productname}
          by={foodProduct.FoodProduct.brandname}
          desc={foodProduct.FoodProduct.description}
        />
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}

export default FoodProductProfile;
