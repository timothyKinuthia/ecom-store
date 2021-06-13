import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClicked, numStars }) => {
  return (
    <>
      <StarRating
        changeRating={() => starClicked(numStars)}
        numberOfStars={numStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
    </>
  );
};

export default Star;
