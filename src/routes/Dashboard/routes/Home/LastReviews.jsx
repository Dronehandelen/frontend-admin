import React from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import Stars from '../../../../components/Stars.jsx';

export const lastReviewsFragment = gql`
    fragment LastReviews on Query {
        lastReviews {
            id
            stars
            review
            product {
                title
            }
            user {
                firstName
                lastName
            }
        }
    }
`;

const Review = styled.div`
    &:not(:last-child) {
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(33, 33, 33, 0.1);
    }

    *:not(:last-child) {
        margin-bottom: 4px;
    }

    .product {
        font-size: 0.8em;
    }

    .user {
        font-size: 0.9em;
    }
`;

const LastReviews = ({ reviews }) => {
    return (
        <div>
            {reviews.map((review) => (
                <Review key={review.id}>
                    <div className="product">
                        <i>{review.product.title}</i>
                    </div>
                    <div>{review.review}</div>
                    <div>
                        <Stars stars={review.stars} />{' '}
                        <i className="user">
                            {review.user.firstName} {review.user.lastName}
                        </i>
                    </div>
                </Review>
            ))}
        </div>
    );
};

export default LastReviews;
