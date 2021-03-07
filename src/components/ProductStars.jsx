import React from 'react';
import Stars from './Stars';

const ProductStars = ({ stars }) => {
    return (
        <div>
            <Stars stars={stars.rating} /> ({stars.count})
        </div>
    );
};

export default ProductStars;
