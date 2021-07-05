import React, {useContext} from 'react'
import { VeganContext } from '../context/VeganContext'
import PreviewCard from './PreviewCard';
import { Grid } from '@material-ui/core'



function IngredientBrands() {

    const {ingredientBrands} = useContext(VeganContext)


    return (
        <div className="suggestedBrands">
            <Grid 
                className="gridLayout"  
                container spacing={0}           
            >
                {ingredientBrands && ingredientBrands.map((brand)=>{
                    return(
                    <PreviewCard 
                            key={brand.id} 
                            name={brand.productname}
                            image={brand.image}
                            createUser={brand.brandname}
                            identifier={brand.id}
                            type="brand"
                    />
                    )
                })}
            </Grid>
        </div>
    )
}

export default IngredientBrands
