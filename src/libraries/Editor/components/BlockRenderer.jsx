import React from 'react';
import ImageBlock from './ImageBlock';
import YouTubeBlock from './YouTubeBlock/YouTubeBlock.jsx';
import EternalFileBlock from './EternalFileBlock.jsx';
import ProductBlock from './ProductBlock';

const BlockRenderer = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src, youTubeId, title, productId } = entity.getData();
    const type = entity.getType();

    if (type === 'image') {
        return <ImageBlock src={src} />;
    }

    if (type === 'youTube') {
        return <YouTubeBlock youTubeId={youTubeId} />;
    }

    if (type === 'product') {
        return <ProductBlock productId={productId} />;
    }

    if (type === 'externalFile') {
        return <EternalFileBlock src={src} title={title} />;
    }

    return <span />;
};

export default BlockRenderer;
