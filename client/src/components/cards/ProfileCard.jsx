import React, { useContext } from 'react';
import { VeganContext } from '../../context/VeganContext';
import { Grid } from '@material-ui/core';
import { Image } from 'cloudinary-react';

function ProfileCard(props) {
  const { profileType } = useContext(VeganContext);

  switch (profileType) {
    case 'ingredient':
      console.log('welcome to the ingredient profile');
      break;
    case 'foodProduct':
      console.log('welcome to the FoodProducts profile');
      break;
    case 'recipe':
      console.log('welcome to the recipe profile');
      break;
    default:
      console.log('no profile detected');
  }

  return (
    <div className="profileCard">
      <div className="mainPageHeader">
        <h1>{props.title}</h1>
      </div>
      <div className="profileContents">
        <Grid container spacing={0} className="gridLayout">
          <Grid item xs={12} sm={12} md={4}>
            <div className="profileImageContainer">
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                publicId={props.image}
                className="profileImage"
                height="100"
                width="100"
                // crop="crop"
                alt="Product"
                draggable="false"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <div className="profileText">
              <div className="profileBy">
                <p>By</p>
              </div>
              <div className="profileAuthor">
                <p>{props.by}</p>
              </div>
              <div className="profileDescription">
                <p>{props.desc}</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProfileCard;
