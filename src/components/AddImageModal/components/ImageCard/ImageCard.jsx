import React from 'react';
import cn from 'classnames';
import styles from './imageCard.module.scss';

const ImageCard = ({ image, selected, onClick }) => {
    return (
        <div
            className={cn(styles.imageCard, {
                [styles.selected]: selected,
            })}
            onClick={onClick}
        >
            <img src={image.url} alt="" />
        </div>
    );
};

export default ImageCard;
