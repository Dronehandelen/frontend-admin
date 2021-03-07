import React from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import date from '../../../../helpers/date.js';

export const lastAddToCartFragment = gql`
    fragment LastAddToCartFragment on Stats {
        lastProductEvents(eventName: "addToCart") {
            happenedAt
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

const AddToCartEvent = styled.div`
    &:not(:last-child) {
        margin-bottom: 6px;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(33, 33, 33, 0.1);
    }

    *:not(:last-child) {
        margin-bottom: 4px;
    }

    .meta {
        font-size: 0.8em;
    }
`;

const LastAddToCartEvents = ({ stats }) => {
    return (
        <div>
            {stats.lastProductEvents.map((event, index) => (
                <AddToCartEvent key={index}>
                    <div>{event.product.title}</div>
                    <div className="meta">
                        <i>
                            {date.niceDateTime(event.happenedAt)}
                            {event.user && (
                                <>
                                    {' '}
                                    - {event.user.firstName}{' '}
                                    {event.user.lastName}
                                </>
                            )}
                        </i>
                    </div>
                </AddToCartEvent>
            ))}
        </div>
    );
};

export default LastAddToCartEvents;
