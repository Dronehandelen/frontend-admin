import React from 'react';

const treeContext = React.createContext({});

export const useExpanded = (categoryId) => {
    const { getIsExpanded, toggle, onCategoryEdit } = React.useContext(
        treeContext
    );

    return {
        isExpanded: getIsExpanded(categoryId),
        toggle: () => toggle(categoryId),
        onCategoryEdit,
    };
};

const TreeProvider = ({ children, onCategoryEdit }) => {
    const [expanded, setExpanded] = React.useState({});

    return (
        <treeContext.Provider
            value={{
                getIsExpanded: (categoryId) => !!expanded[categoryId],
                toggle: (categoryId) =>
                    setExpanded({
                        ...expanded,
                        [categoryId]: !expanded[categoryId],
                    }),
                onCategoryEdit,
            }}
        >
            {children}
        </treeContext.Provider>
    );
};

export default TreeProvider;
