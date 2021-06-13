
import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
    if (p && p.ratings) {
        const ratingsArray = p && p.ratings;

        const total = [];

        const length = ratingsArray.length;

        ratingsArray.map(r => total.push(r.star));

        const totalReduce = total.reduce((p, n) => p + n, 0);

        const result = totalReduce / length;

        return (
            <div className='text-center pt-1 pb-3'>
                <span>
                    <StarRating starDimension="20px" starSpacing="2px" starRatedColor="orange" editing={false} rating={result}/>{" "} ({p.ratings.length})
                </span>
            </div>
        )
    }

}
