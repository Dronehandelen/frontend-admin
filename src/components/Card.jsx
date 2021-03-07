import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';

const StyledCard = styled.div`
    background: #fff;
    margin-bottom: 12px;
    border: 1px solid rgba(33, 33, 33, 0.1);
    border-radius: 2px;
    box-shadow: none;
    padding: 15px;

    &.green {
        background-color: #01c853;
        color: white;
    }

    &.yellow {
        background-color: #fec107;
        color: white;
    }

    &.blue {
        background-color: #2879ff;
        color: white;
    }

    &.red {
        background-color: #ff2a00;
        color: white;
    }
`;

const Card = ({ children, style, className, color }) => {
    return (
        <StyledCard style={style} className={cn(className, color)}>
            {children}
        </StyledCard>
    );
};

export default Card;
