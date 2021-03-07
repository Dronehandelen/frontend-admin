import BlockRenderer from './BlockRenderer.jsx';

const blockRendererFn = (block) => {
    if (block.getType() === 'atomic') {
        return {
            component: BlockRenderer,
            editable: false,
        };
    }

    return null;
};

export default blockRendererFn;
