import gql from 'graphql-tag';

export default gql`
    fragment AdminProductFragment on Product {
        id
        alias
        type
        description
        shortDescription
        thirdPartyDescription
        expiredAt
        originalPrice
        price
        title
        isPublished
        stock
        countAvailableForBackorder
        backorderMessage
        width
        height
        depth
        weight
        warehousePlacement
        createdAt
        images {
            fileId
            url
        }
        primaryImage {
            fileId
            url
        }
        brandId
        brand {
            id
            name
        }
        gtin
        stars {
            rating
            count
        }
        reviews {
            id
            review
            stars
            createdAt
            user {
                id
                firstName
                lastName
            }
        }
        relatedProducts(count: 4) {
            id
            title
            shortDescription
            originalPrice
            price
            stock
            createdAt
            primaryImage {
                url
            }
            stars {
                rating
                count
            }
            brand {
                id
                name
            }
        }
        relatedByOrderProducts: relatedProducts(
            count: 4
            filters: { byOrderWithProduct: true }
        ) {
            id
            title
            shortDescription
            originalPrice
            price
            stock
            createdAt
            primaryImage {
                url
            }
            stars {
                rating
                count
            }
            brand {
                id
                name
            }
        }
        questions {
            id
            user {
                firstName
                lastName
            }
            content
            createdAt
            answers {
                id
                user {
                    firstName
                    lastName
                }
                content
                createdAt
            }
        }
        categories {
            id
            name
        }
        tags {
            id
            name
        }
        accessories {
            id
            title
            shortDescription
            originalPrice
            price
            stock
            createdAt
            primaryImage {
                url
            }
            stars {
                rating
                count
            }
            brand {
                id
                name
            }
        }
        packageProducts {
            packageProductId
            amount
        }
        competitorPrices {
            competitorId
            price
        }
        competitorReferences {
            competitorId
            reference
        }
        canonicalRedirectProductId
    }
`;
