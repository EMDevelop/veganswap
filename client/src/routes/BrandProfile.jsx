import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Axios from '../apis/axios'
import { VeganContext } from '../context/VeganContext'
import { Spinner } from 'react-bootstrap'
import ProfileCard from '../components/ProfileCard';

function BrandProfile() {

    const { id } = useParams();
    const { brand, setBrand, setProfileType } = useContext(VeganContext)
    const [finishedLoading, setFinishedLoading] = useState(null)

    useEffect(() => {
        setProfileType('brand')
        const fetchData = async () => {
            try {
                const response = await Axios.get(`/brands/profile/${id}`)
                setBrand(response.data.data.Brand)
                setFinishedLoading(true)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [])


    return (
        <div className="generalPage">
            {finishedLoading ?
            <ProfileCard
                image={brand.image}
                title={brand.productname}
                by={brand.brandname}
                desc={brand.description}
            />
            : <Spinner animation="border" />
        }
        </div>
    )
}

export default BrandProfile
