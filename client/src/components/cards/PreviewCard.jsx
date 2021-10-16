import React from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Image } from "cloudinary-react";

function PreviewCard(props) {
  let history = useHistory();
  const handleClick = (id, type) => {
    switch (type) {
      case "recipe":
        history.push(`/recipes/profile/${id}`);
        break;
      case "ingredient":
        history.push(`/ingredients/profile/${id}`);
        break;
      case "foodProduct":
        history.push(`/foodProducts/profile/${id}`);
        break;
      default:
        console.log("no type or path setup");
    }
  };

  return (
    <Grid item xs={12} sm={4} md={4} lg={4}>
      <div
        className="previewCard"
        onClick={() => handleClick(props.identifier, props.type)}
      >
        <Image
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={props.image}
          className="previewImage"
          width="auto"
          crop="scale"
          alt="Product"
          draggable="false"
        />
        <div className="previewText">
          <h5 className="">{props.name}</h5>
          <p className="">
            <small className="text-muted">{`By: ${props.createUser}`}</small>
          </p>
        </div>
      </div>
    </Grid>
  );
}

export default PreviewCard;
