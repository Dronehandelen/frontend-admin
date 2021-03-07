import React from 'react';
import Editor from './Editor.jsx';
import gql from 'graphql-tag';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

const articleFragment = gql`
    fragment Article on Article {
        id
        isPublished
        title
        SEODescription
        description
        headerImage {
            fileId
            url
        }
    }
`;

const query = gql`
    query GetArticleForEditing($id: Int!) {
        article(id: $id) {
            ...Article
        }
    }
    ${articleFragment}
`;

const editArticleMutation = gql`
    mutation EditArticle($id: Int, $article: ArticleInput!) {
        article(id: $id, article: $article) {
            ...Article
        }
    }
    ${articleFragment}
`;

const ArticleLoader = ({ articleId, children }) => {
    return (
        <DefaultHookQuery
            queryHookData={useQuery(query, { variables: { id: articleId } })}
        >
            {({ data }) => children(data.article)}
        </DefaultHookQuery>
    );
};

const EditorContainer = ({ defaultValues, articleId }) => {
    const [editProduct, { error: editError, loading: saving }] = useMutation(
        editArticleMutation
    );
    const [state, _setState] = React.useState(defaultValues);
    const history = useHistory();
    const location = useLocation();

    return (
        <Editor
            state={state}
            setState={(newState) => _setState({ ...state, ...newState })}
            save={() => {
                const article = {
                    title: state.title,
                    description: JSON.stringify(
                        convertToRaw(state.description.getCurrentContent())
                    ),
                    isPublished: state.isPublished,
                    SEODescription: state.SEODescription,
                    headerImageId: state.headerImage
                        ? state.headerImage.fileId
                        : null,
                };

                editProduct({
                    variables: {
                        id: articleId || null,
                        article,
                    },
                }).then(({ data }) => {
                    if (!articleId) {
                        history.push(
                            String(location.pathname).replace(
                                'new',
                                data.article.id
                            )
                        );
                    }
                });
            }}
            error={editError}
            saving={saving}
        />
    );
};

const Wrapper = (props) => {
    const articleId = props.match.params.articleId;

    const defaultValues = {
        isPublished: false,
        title: '',
        SEODescription: '',
        description: EditorState.createEmpty(),
        headerImage: null,
    };

    if (articleId) {
        const parsedId = parseInt(articleId);
        return (
            <ArticleLoader articleId={parsedId}>
                {(articleData) => (
                    <EditorContainer
                        articleId={parsedId}
                        defaultValues={{
                            ...defaultValues,
                            ...articleData,
                            description: EditorState.createWithContent(
                                convertFromRaw(
                                    JSON.parse(articleData.description)
                                )
                            ),
                        }}
                    />
                )}
            </ArticleLoader>
        );
    }

    return <EditorContainer defaultValues={defaultValues} />;
};

export default Wrapper;
