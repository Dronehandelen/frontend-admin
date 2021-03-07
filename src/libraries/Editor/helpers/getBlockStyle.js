import styles from '../editor.module.scss';

const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'blockquote':
            return styles.blockquote;
        default:
            return null;
    }
};

export default getBlockStyle;
