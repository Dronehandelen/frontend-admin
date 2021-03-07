import React from 'react';
import Editor from './Editor.jsx';
import DisplayEditor from './DisplayEditor.jsx';

const EditorContainer = (props) => {
    if (typeof props.onChange === 'function') {
        return <Editor {...props} />;
    }

    return <DisplayEditor {...props} />;
};

export default EditorContainer;
