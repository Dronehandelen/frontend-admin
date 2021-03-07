import React from 'react';
import cn from 'classnames';
import styles from './product.module.scss';
import { Link } from 'react-router-dom';
import { promotion } from '../../helpers/product.js';
import ProductStars from '../ProductStars';
import Image from './Image.jsx';

const ProductCard = ({ product, prefix = '', imageHeight }) => {
    const { hasPromotion } = promotion(product);

    return (
        <Link
            className={cn(styles.productCard, 'position-relative')}
            to={`${prefix}/p/${product.alias}`}
        >
            <Image product={product} imageHeight={imageHeight} />
            <div className="flex-grow-1">
                <div className="mt-2">
                    <strong>{product.title}</strong>
                </div>
                <div>{product.shortDescription}</div>
                {product.stars && <ProductStars stars={product.stars} />}
            </div>
            <div className="d-flex justify-content-between mt-2">
                <div className="d-flex justify-content-center flex-column">
                    <div>
                        {hasPromotion && (
                            <div className={styles.beforePrice}>
                                Før {product.originalPrice},-
                            </div>
                        )}
                        <div>
                            {hasPromotion && 'Nå'}{' '}
                            <strong className={styles.price}>
                                {product.price},-
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
