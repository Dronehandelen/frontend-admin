import React from 'react';
import cn from 'classnames';
import {
    Editor,
    RichUtils,
    getDefaultKeyBinding,
    EditorState,
    AtomicBlockUtils,
} from 'draft-js';
import BlockStyleControls from './components/BlockStyleControls';
import InlineStyleControls from './components/InlineStyleControls';
import styles from './editor.module.scss';
import blockRendererFn from './components/blockRendererFn.js';
import StyleButton from './components/StyleButton';
import getBlockStyle from './helpers/getBlockStyle.js';
import styleMap from './helpers/styleMap.js';
import AddImageModal from '../AddImageModal';
import YouTubeModal from './components/YouTubeModal.jsx';
import FileUpload from './components/FileUpload/FileUpload.jsx';
import ProductModal from './components/ProductModal.jsx';

const MyEditor = ({ editorState, onChange }) => {
    const editable = !!onChange;
    const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
    const [isYouTubeModalOpen, setIsYouTubeModalOpen] = React.useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);
    const [isFileUploadOpen, setFileUploadOpen] = React.useState(false);
    const editorEl = React.useRef(null);

    const focusEditor = () => {
        editorEl.current.focus();
    };

    React.useEffect(() => {
        focusEditor();
    }, []);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return true;
        }

        return false;
    };

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                editorState,
                4 /* maxDepth */
            );
            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return;
        }

        return getDefaultKeyBinding(e);
    };

    const toggleBlockType = (blockType) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const addImage = (src) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'image',
            'IMMUTABLE',
            { src }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        onChange(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
        );

        setTimeout(() => focusEditor(), 0);
    };

    const addYouTubeVideo = (youTubeId) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'youTube',
            'IMMUTABLE',
            { youTubeId }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });

        onChange(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
        );

        setTimeout(() => focusEditor(), 0);
    };

    const addProduct = (productId) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'product',
            'IMMUTABLE',
            { productId }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });

        onChange(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
        );

        setTimeout(() => focusEditor(), 0);
    };

    const addFile = (data) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'externalFile',
            'IMMUTABLE',
            data
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });

        onChange(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
        );

        setTimeout(() => focusEditor(), 0);
    };

    const contentState = editorState.getCurrentContent();

    return (
        <div className={styles.wrapper}>
            {editable && (
                <>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={toggleInlineStyle}
                    />
                    <div>
                        <StyleButton
                            label={<i className="fa fa-picture-o" />}
                            onToggle={() => setIsImageModalOpen(true)}
                        />
                        <StyleButton
                            label={<i className="fa fa-youtube-play" />}
                            onToggle={() => setIsYouTubeModalOpen(true)}
                        />
                        <StyleButton
                            label={<i className="fa fa-file" />}
                            onToggle={() => setFileUploadOpen(true)}
                        />
                        <StyleButton
                            label="Product"
                            onToggle={() => setIsProductModalOpen(true)}
                        />
                    </div>
                </>
            )}
            <div
                className={cn(styles.editor, {
                    [styles.hidePlaceholder]:
                        !contentState.hasText() &&
                        contentState.getBlockMap().first().getType() !==
                            'unstyled',
                })}
                onClick={focusEditor}
            >
                <Editor
                    readOnly={!editable}
                    blockRendererFn={blockRendererFn}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    placeholder="Write..."
                    ref={editorEl}
                />
            </div>
            {editable && (
                <>
                    <AddImageModal
                        single
                        isOpen={isImageModalOpen}
                        onClose={() => setIsImageModalOpen(false)}
                        onAdd={([{ url }]) => {
                            setIsImageModalOpen(false);
                            addImage(url);
                        }}
                    />
                    <YouTubeModal
                        isOpen={isYouTubeModalOpen}
                        onClose={() => setIsYouTubeModalOpen(false)}
                        onAdd={({ youTubeId }) => {
                            setIsYouTubeModalOpen(false);
                            addYouTubeVideo(youTubeId);
                        }}
                    />
                    <ProductModal
                        isOpen={isProductModalOpen}
                        onClose={() => setIsProductModalOpen(false)}
                        onAdd={({ productId }) => {
                            setIsProductModalOpen(false);
                            addProduct(productId);
                        }}
                    />
                    {isFileUploadOpen && (
                        <FileUpload
                            isOpen={isFileUploadOpen}
                            onClose={() => setFileUploadOpen(false)}
                            onAdd={(data) => {
                                setFileUploadOpen(false);
                                addFile(data);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default MyEditor;
