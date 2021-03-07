import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const StyledDropZones = styled.div`
    display: flex;
`;

const StyledZone = styled.div`
    z-index: 2;
    padding: 0 10px;

    &.isOver {
        color: white;
        background-color: #1d446b;
    }
`;

const Zone = ({ children, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'node',
        canDrop: () => true,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <StyledZone
            ref={drop}
            className={cn({
                isOver,
            })}
        >
            {children}
        </StyledZone>
    );
};

const DropZones = ({ children, onDrop, enableDropUnder = false }) => {
    const handleDrop = (name) => (...props) => onDrop(name, ...props);
    return (
        <StyledDropZones>
            <div className="mr-4">{children}</div>
            <Zone onDrop={handleDrop('same_level_over')}>
                Samme nivå - over
            </Zone>
            <Zone onDrop={handleDrop('same_level_under')}>
                Samme nivå - under
            </Zone>
            {enableDropUnder && (
                <Zone onDrop={handleDrop('level_under')}>Nivå under</Zone>
            )}
        </StyledDropZones>
    );
};

export default DropZones;
