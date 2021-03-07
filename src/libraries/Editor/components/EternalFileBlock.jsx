import React from 'react';
import styled from 'styled-components';

const Block = styled.a`
    border: 1px solid gray;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    :hover {
        background-color: #b6b6b6;
        text-decoration: none;
        color: inherit;
    }
`;

const EternalFileBlock = ({ src, title }) => {
    return (
        <div className="d-flex">
            <Block href={src} target="_blank">
                <i className="fa fa-external-link" /> {title}
            </Block>
        </div>
    );
};

export default EternalFileBlock;
