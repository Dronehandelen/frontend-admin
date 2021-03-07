import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';

const Star = styled.div`
    &.clickable {
        cursor: pointer;
    }

    color: #fed126;
`;

const StyledStars = styled.div`
    display: inline-block;
`;

const Stars = ({ stars, setStars, lg = false }) => {
    return (
        <StyledStars>
            {[...Array(5)].map((x, i) => (
                <Star
                    key={i}
                    className={cn('fa fa-star mr-1', {
                        'fa-star': stars !== null && i < stars,
                        'fa-star-o': stars === null || i >= stars,
                        'fa-2x': lg,
                        clickable: !!setStars,
                    })}
                    onClick={() => setStars && setStars(i + 1)}
                />
            ))}
        </StyledStars>
    );
};

export default Stars;
