import React from 'react';
import Searches from './Searches.jsx';
import moment from 'moment';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const query = gql`
    query GetMostUsedSearchStrings($from: DateTime!, $to: DateTime!) {
        statsSearchStrings(from: $from, to: $to) {
            edges {
                cursor
                node {
                    searchString
                    count
                }
            }
        }
    }
`;

const SearchesContainer = () => {
    const [from, setFrom] = React.useState(
        moment().startOf('day').subtract(30, 'days')
    );
    const [to, setTo] = React.useState(moment().add(1, 'day').startOf('day'));

    return (
        <Searches
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            queryData={useQuery(query, {
                variables: {
                    from: from.toISOString(),
                    to: to.toISOString(),
                },
            })}
        />
    );
};

export default SearchesContainer;
