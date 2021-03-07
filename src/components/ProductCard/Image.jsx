import React from 'react';
import styled from 'styled-components';
import { getDefaultProductImageUrl } from '../../helpers/product.js';

const ProductImage = styled.div`
    height: ${(props) => props.imageHeight}px;
    max-width: 100%;
    background: url('${(props) => props.src}') center center no-repeat;
    background-size: contain;
`;

const Image = ({ product, imageHeight = 200 }) => {
    let imgUrl = getDefaultProductImageUrl(product);

    return <ProductImage src={imgUrl} imageHeight={imageHeight} />;
};

export default Image;
