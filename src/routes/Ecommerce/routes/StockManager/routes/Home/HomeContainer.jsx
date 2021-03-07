import React from 'react';
import gql from 'graphql-tag';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { useQuery } from '@apollo/client';
import Home from './Home.jsx';

const query = gql`
    query GetSuppliersWithEstimatedLostRevenue {
        suppliers {
            id
            name
            estimatedLostRevenue(days: 60) {
                total
            }
        }
    }
`;

const HomeContainer = ({ match }) => {
    return (
        <DefaultHookQuery queryHookData={useQuery(query)}>
            {({ data }) => (
                <Home
                    suppliers={data.suppliers.slice()}
                    currentUrl={match.url}
                />
            )}
        </DefaultHookQuery>
    );
};

export default HomeContainer;
