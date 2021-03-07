import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../../containers/DefaultHookQuery.jsx';
import { useDrag, useDrop } from 'react-dnd';
import DropZones from './DropZones.jsx';
import sort from './sort.js';
import { useExpanded } from './treeContext.js';

const getCategoryQuery = gql`
    query GetCategoryQuery($id: Int!) {
        category(id: $id) {
            id
            order
            childCategories {
                id
                alias
                name
                order
                displayInHeader
            }
        }
    }
`;

const SubCategory = ({ category, categoryMutation }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(getCategoryQuery, {
                variables: {
                    id: category.id,
                },
            })}
        >
            {({ data }) => (
                <>
                    {sort(data.category.childCategories).map(
                        (childCategory) => (
                            <CategoryContainer
                                key={childCategory.id}
                                category={childCategory}
                                parentCategoryId={category.id}
                                categoryMutation={categoryMutation}
                            />
                        )
                    )}
                </>
            )}
        </DefaultHookQuery>
    );
};

const StyledCategory = styled.div`
    border-bottom: 1px solid gray;
    padding: 10px 10px 10px 0;
    cursor: pointer;
    display: flex;
`;

const CategoryContainer = ({
    category,
    parentCategoryId,
    categoryMutation,
}) => {
    const { isExpanded, toggle, onCategoryEdit } = useExpanded(category.id);

    // eslint-disable-next-line no-unused-vars
    const [_, drag] = useDrag({
        item: { type: 'node', category, parentCategoryId: parentCategoryId },
        canDrag: true,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'node',
        canDrop: (item) => {
            return !!item.category;
        },
        collect: (monitor) => ({
            canDrop: !!monitor.canDrop(),
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <>
            <StyledCategory
                ref={(node) => {
                    drag(node);
                    drop(node);
                }}
                onClick={() => toggle()}
            >
                <i
                    className="fa fa-edit"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onCategoryEdit(category)}
                />
                {category.name}
                {canDrop && isOver && (
                    <DropZones
                        onDrop={(dropType, itemToMove) => {
                            if (dropType === 'same_level_over') {
                                categoryMutation({
                                    id: itemToMove.category.id,
                                    category: {
                                        parentCategoryId,
                                        order: category.order,
                                    },
                                });
                            }
                            if (dropType === 'same_level_under') {
                                categoryMutation({
                                    id: itemToMove.category.id,
                                    category: {
                                        parentCategoryId,
                                        order: category.order + 1,
                                    },
                                });
                            }
                            if (dropType === 'level_under') {
                                categoryMutation({
                                    id: itemToMove.category.id,
                                    category: {
                                        parentCategoryId: category.id,
                                    },
                                });
                            }
                        }}
                        enableDropUnder
                    />
                )}
            </StyledCategory>
            <div style={{ paddingLeft: 20 }}>
                {isExpanded && (
                    <SubCategory
                        category={category}
                        categoryMutation={categoryMutation}
                    />
                )}
            </div>
        </>
    );
};

export default CategoryContainer;
