import React, {useContext} from 'react'
import { VeganContext } from '../context/VeganContext'
import PreviewCard from './PreviewCard';
import { Grid } from '@material-ui/core'
import { Spinner } from 'react-bootstrap'


function FoodProducts() {

    const {ingredientProfile} = useContext(VeganContext)


    return (
        <div className="suggestedBrands">
            <h1 className="subHeading">
                Suggested Products:
            </h1>
            <Grid 
                className="gridLayout"  
                container spacing={0}           
            >
                {ingredientProfile.foodProducts && ingredientProfile.foodProducts.map((product)=>{
                    return(
                    <PreviewCard 
                            key={product.id} 
                            name={product.productname}
                            image={product.image}
                            createUser={product.brandname}
                            identifier={product.id}
                            type="foodProduct"
                    />
                    )
                })}
            </Grid>
        </div>
    )
}

export default FoodProducts
