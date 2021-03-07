import React from 'react';
import styles from './imageBlock.module.scss';
import FullscreenImage from '../../../../components/FullscreenImage/FullscreenImage.jsx';

const ImageBlock = ({ src }) => {
    const [isImageFullScreen, setIsImageFullScreen] = React.useState(false);

    return (
        <div
            className={styles.wrapper}
            onClick={() => setIsImageFullScreen(true)}
        >
            <div>
                <img src={src} alt="" />
            </div>
            <FullscreenImage
                selectedImage={isImageFullScreen && src}
                onClose={(e) => {
                    e.stopPropagation();
                    setIsImageFullScreen(false);
                }}
            />
        </div>
    );
};

export default ImageBlock;
