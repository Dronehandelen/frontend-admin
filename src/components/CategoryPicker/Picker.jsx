import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { FormGroup, Input, Label } from 'reactstrap';

const TagSelector = ({ tag, ...props }) => {
    const Tag = tag;

    return <Tag {...props} />;
};

const MobileLink = styled(TagSelector)`
    display: block;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid white;
    padding: 10px 5px;

    :hover {
        text-decoration: none;
        color: inherit;
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const StyledCategory = styled.div`
    padding-left: ${(props) => props.indent}px;
`;

const Category = ({
    category,
    indent = 0,
    forceLink,
    parentCategoryNames = [],
    selectedCategories,
    setSelectedCategories,
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const hasChild =
        !forceLink &&
        category.childCategories &&
        category.childCategories.length !== 0;

    const isSelected = selectedCategories.indexOf(category.id) !== -1;

    const toggle = () =>
        setSelectedCategories(
            isSelected
                ? [...selectedCategories].filter((id) => id !== category.id)
                : [...selectedCategories, category.id]
        );

    return (
        <StyledCategory indent={indent}>
            <MobileLink
                onClick={() => {
                    setIsExpanded(!isExpanded);

                    if (!hasChild) {
                        toggle();
                    }
                }}
                tag={'div'}
            >
                <div className="d-inline-block" style={{ width: 18 }}>
                    {hasChild && (
                        <i
                            className={cn('fa', {
                                'fa-caret-right': !isExpanded,
                                'fa-caret-down': isExpanded,
                            })}
                        />
                    )}
                </div>
                {!hasChild && (
                    <div className="d-inline-block">
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    onChange={toggle}
                                    checked={isSelected}
                                />
                                &nbsp;
                            </Label>
                        </FormGroup>
                    </div>
                )}
                <div className="d-inline-block">{category.name}</div>
            </MobileLink>
            {isExpanded && hasChild && (
                <>
                    <Category
                        category={{
                            ...category,
                            name: 'Alt i ' + category.name,
                        }}
                        parentCategoryNames={[
                            ...parentCategoryNames,
                            category.name,
                        ]}
                        indent={indent + 10}
                        forceLink
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                    {category.childCategories.map((childCategory) => (
                        <Category
                            category={childCategory}
                            key={childCategory.id}
                            indent={indent + 10}
                            parentCategoryNames={[
                                ...parentCategoryNames,
                                category.name,
                            ]}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                    ))}
                </>
            )}
        </StyledCategory>
    );
};

const MobileCategoryDropdown = ({
    categories,
    selectedCategories,
    setSelectedCategories,
}) => {
    return (
        <div>
            {categories.map((category) => (
                <Category
                    category={category}
                    key={`main-${category.id}`}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            ))}
        </div>
    );
};

export default MobileCategoryDropdown;
