import React, {usestate, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { Spinner } from 'react-bootstrap'

function BrandProfile() {

    const {id} = useParams();
    const {brand, setBrand} = useContext(VeganContext)

    useEffect(() => {
        
        const fetchData = async () => { 
            try {
                const response = await Axios.get(`/brands/profile/${id}`)
                setBrand(response.data.data.Brand)
                console.log(brand)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [])
    

    return (
        <div className="generalPage">
           
            <h1 className="mainPageHeader"> {`Brand Profile: ${brand.productname}`} </h1>
            <div className ="brandProfileCard">
            <img src={brand.image} alt="Placeholder"/> 
                <p>{brand.description}</p> 
                <p>{`Brand Profile: ${brand.brandname}`}</p> 
            </div>
        </div>
    )
}

export default BrandProfile
