import React from 'react';
import DefaultHookQuery from './DefaultHookQuery.jsx';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';

const SupplierOrderLoader = ({ queryGQL, selectedId, children }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(queryGQL, {
                variables: {
                    selectedId,
                },
            })}
        >
            {({ data }) => children(data)}
        </DefaultHookQuery>
    );
};

const EditorContainer = ({
    defaultValues,
    selectedId,
    mutationGQL,
    stateToGraphqlModelData,
    children,
    modelData,
}) => {
    const [save, { error: editError, loading: saving }] = useMutation(
        mutationGQL
    );
    const [state, _setState] = React.useState(defaultValues);
    const history = useHistory();
    const location = useLocation();

    return children({
        state,
        setState: (newState) => _setState({ ...state, ...newState }),
        save: () => {
            save({
                variables: {
                    selectedId: selectedId || null,
                    modelData: stateToGraphqlModelData(state),
                },
            })
                .then(({ data }) => {
                    if (!selectedId) {
                        history.push(
                            String(location.pathname).replace(
                                'new',
                                data.supplierOrder.id
                            )
                        );
                    }
                })
                .catch(() => {});
        },
        error: editError,
        saving,
        modelData,
    });
};

const CreateOrEditContainer = ({
    defaultValues,
    queryGQL,
    mutationGQL,
    selectedId,
    children,
    graphqlDataToState,
    stateToGraphqlModelData,
}) => {
    if (selectedId) {
        return (
            <SupplierOrderLoader
                queryGQL={queryGQL}
                selectedId={parseInt(selectedId)}
            >
                {(modelData) => {
                    return (
                        <EditorContainer
                            defaultValues={graphqlDataToState(
                                defaultValues,
                                modelData
                            )}
                            children={children}
                            mutationGQL={mutationGQL}
                            stateToGraphqlModelData={stateToGraphqlModelData}
                            selectedId={parseInt(selectedId)}
                        />
                    );
                }}
            </SupplierOrderLoader>
        );
    }

    return (
        <EditorContainer
            defaultValues={defaultValues}
            mutationGQL={mutationGQL}
            stateToGraphqlModelData={stateToGraphqlModelData}
            children={children}
        />
    );
};

export default CreateOrEditContainer;
