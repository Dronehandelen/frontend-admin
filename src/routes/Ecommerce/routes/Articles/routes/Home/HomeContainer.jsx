import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Home from './Home.jsx';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';

const GET_ARTICLES_QUERY = gql`
    query GetArticles {
        articles {
            edges {
                node {
                    id
                    title
                    SEODescription
                    description
                    creator {
                        firstName
                        lastName
                    }
                    updatedAt
                    createdAt
                }
            }
        }
    }
`;

const HomeContainer = ({ match }) => {
    return (
        <DefaultHookQuery queryHookData={useQuery(GET_ARTICLES_QUERY)}>
            {({ data }) => (
                <Home
                    articles={data.articles.edges.map((e) => e.node)}
                    currentUrl={match.url}
                />
            )}
        </DefaultHookQuery>
    );
};

export default HomeContainer;
