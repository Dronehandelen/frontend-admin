import React from 'react';
import Editor from './Editor.jsx';
import gql from 'graphql-tag';
import moment from 'moment';
import CreateOrEditContainer from '../../../../../../containers/CreateOrEditContainer.jsx';

const supplierOrderFragment = gql`
    fragment SupplierOrder on SupplierOrder {
        id
        totalPrice
        supplierId
        shippingPrice
        otherFees
        exchangeRate
        currency
        orderedAt
        supplier {
            id
            name
        }
        updatedAt
        createdAt
        supplierOrderProducts {
            productId
            amount
            pricePerItem
        }
    }
`;

const query = gql`
    query GetSupplierOrderForEditing($selectedId: Int!) {
        supplierOrder(id: $selectedId) {
            ...SupplierOrder
        }
    }
    ${supplierOrderFragment}
`;

const editSupplierOrderMutation = gql`
    mutation EditSupplierOrder(
        $selectedId: Int
        $modelData: SupplierOrderInput!
    ) {
        supplierOrder(id: $selectedId, supplierOrder: $modelData) {
            ...SupplierOrder
        }
    }
    ${supplierOrderFragment}
`;

const EditorContainer = (props) => {
    return (
        <CreateOrEditContainer
            defaultValues={{
                orderDate: moment(),
                totalPrice: 0,
                shippingPrice: 0,
                otherFeesPrice: 0,
                currency: 'NOK',
                exchangeRate: 1,
                supplierId: 1,
                products: [],
            }}
            mutationGQL={editSupplierOrderMutation}
            queryGQL={query}
            selectedId={props.match.params.supplierOrderId}
            graphqlDataToState={(
                defaultValues,
                { supplierOrder: modelData }
            ) => ({
                ...defaultValues,
                ...modelData,
                orderDate: moment(modelData.orderedAt),
                products: modelData.supplierOrderProducts.map((sop) => ({
                    productId: sop.productId,
                    amount: sop.amount,
                    pricePerItem: sop.pricePerItem,
                })),
            })}
            stateToGraphqlModelData={(state) => ({
                orderedAt: state.orderDate.utc().startOf('day').toISOString(),
                totalPrice: parseFloat(state.totalPrice),
                shippingPrice: parseFloat(state.shippingPrice),
                otherFees: parseFloat(state.otherFeesPrice),
                currency: state.currency,
                exchangeRate: parseFloat(state.exchangeRate),
                supplierOrderProducts: state.products,
                supplierId: parseInt(state.supplierId),
            })}
        >
            {({ state, setState, save, error, saving }) => (
                <Editor
                    state={state}
                    setState={setState}
                    save={save}
                    error={error}
                    saving={saving}
                />
            )}
        </CreateOrEditContainer>
    );
};

export default EditorContainer;
