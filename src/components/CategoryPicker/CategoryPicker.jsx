import React from 'react';
import DefaultHookQuery from '../../containers/DefaultHookQuery';
import Picker from './Picker';
import { gql, useQuery } from '@apollo/client';

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            alias
            name
            displayInHeader
            order
            childCategories {
                id
                alias
                name
                order
                displayInHeader
                childCategories {
                    id
                    alias
                    name
                    order
                    displayInHeader
                }
            }
        }
    }
`;

const CategoryPicker = ({ selectedCategories, setSelectedCategories }) => {
    return (
        <DefaultHookQuery queryHookData={useQuery(GET_CATEGORIES)}>
            {({ data }) => (
                <Picker
                    categories={data.categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            )}
        </DefaultHookQuery>
    );
};

export default CategoryPicker;
