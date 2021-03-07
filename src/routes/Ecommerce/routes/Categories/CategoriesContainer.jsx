import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import Categories from './Categories.jsx';
import TreeProvider from './treeContext.js';
import EditCategoryModal from './EditCategoryModal.jsx';

const getCategoriesQuery = gql`
    query GetCategoriesQuery {
        categories {
            id
            alias
            name
            displayInHeader
            order
        }
    }
`;

const CategoryMutation = gql`
    mutation Category($category: CategoryInput!, $id: Int) {
        category(category: $category, id: $id) {
            id
            alias
            name
            displayInHeader
            order
        }
    }
`;

const CategoryContainer = ({ id }) => {
    const [categoryMutation] = useMutation(CategoryMutation, {
        refetchQueries: ['GetCategoriesQuery', 'GetCategoryQuery'],
    });
    const [categoryToEdit, setCategoryToEdit] = React.useState(null);

    const onEdit = ({ id, category }) =>
        categoryMutation({
            variables: {
                id,
                category: {
                    ...category,
                    parentCategoryId:
                        category.parentCategoryId === null
                            ? 0
                            : category.parentCategoryId,
                },
            },
        });

    return (
        <TreeProvider onCategoryEdit={setCategoryToEdit}>
            <EditCategoryModal
                categoryToEdit={categoryToEdit}
                onEdit={onEdit}
                onClose={() => setCategoryToEdit(null)}
            />
            <DefaultHookQuery
                queryHookData={useQuery(getCategoriesQuery, {
                    variables: {
                        id,
                    },
                })}
            >
                {({ data, refetch }) => (
                    <Categories
                        categories={data.categories}
                        categoryMutation={onEdit}
                    />
                )}
            </DefaultHookQuery>
        </TreeProvider>
    );
};

export default CategoryContainer;
