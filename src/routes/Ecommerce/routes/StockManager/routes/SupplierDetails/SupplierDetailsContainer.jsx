import React from 'react';
import gql from 'graphql-tag';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { useQuery } from '@apollo/client';
import SupplierDetails from './SupplierDetails.jsx';

const query = gql`
    query GetSupplierWithEstimatedLostRevenue($id: Int!) {
        supplier(id: $id) {
            id
            name
            estimatedLostRevenue(days: 60) {
                total
                perProduct {
                    total
                    estimatedSalesPerHour
                    product {
                        id
                        title
                        price
                        stock
                    }
                }
            }
        }
    }
`;

const SupplierDetailsContainer = ({ match }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(query, {
                variables: { id: parseInt(match.params.supplierId) },
            })}
        >
            {({ data }) => <SupplierDetails supplier={data.supplier} />}
        </DefaultHookQuery>
    );
};

export default SupplierDetailsContainer;
