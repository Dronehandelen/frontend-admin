import React from 'react';
import { Editor } from 'draft-js';
import blockRendererFn from './components/blockRendererFn.js';
import getBlockStyle from './helpers/getBlockStyle.js';
import styleMap from './helpers/styleMap.js';

const DisplayEditor = ({ editorState }) => (
    <Editor
        readOnly={true}
        blockRendererFn={blockRendererFn}
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
        editorState={editorState}
    />
);

export default DisplayEditor;
