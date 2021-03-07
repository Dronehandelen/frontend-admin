import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

const Wrapper = styled.div`
    display: flex;
    cursor: pointer;
`;

const Box = styled.div`
    width: 23px;
    height: 23px;
    min-width: 23px;
    min-height: 23px;
    border: 1px solid #0277bd;
    margin-right: 10px;
    position: relative;

    &.checked {
        background-color: #0277bd;
    }

    & > i {
        position: absolute;
        left: 2px;
        top: 2px;
        color: white;
    }
`;

const Checkbox = ({ checked, toggle, children }) => {
    return (
        <Wrapper onClick={toggle}>
            <Box
                className={cn({
                    checked,
                })}
            >
                {checked && <i className="fa fa-check" />}
            </Box>
            <div>{children}</div>
        </Wrapper>
    );
};

export default Checkbox;
