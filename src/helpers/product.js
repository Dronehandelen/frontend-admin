import moment from 'moment';

export const getDefaultProductImageUrl = (product) => {
    if (product.primaryImage) {
        return product.primaryImage.url;
    }

    if (product.images.length !== 0) {
        return product.images[0].url;
    }

    return '/image-placeholder.png';
};

export const generateProductAlias = ({ title }) =>
    title
        .replace(/[^a-z0-9]/gim, '-')
        .replace(/\s+/g, ' ')
        .replace(/-+/g, '-')
        .replace(/^-+/g, '')
        .replace(/-+$/g, '')
        .toLowerCase();

export const promotion = (product) => ({
    hasPromotion: product.price !== product.originalPrice,
    promotionPresent:
        ((product.originalPrice - product.price) * 100) / product.originalPrice,
});

const product = (product) => {
    const competitorPrice = (competitorId) => {
        if (!product || !product.competitorPrices) {
            throw new Error('Missing competitor prices');
        }

        const elefunPrice = product.competitorPrices.find(
            (cp) => cp.competitorId === competitorId
        );

        return elefunPrice ? elefunPrice.price : null;
    };

    return {
        ...product,
        competitorPrice,
        expectedPriceBasedOnCompetitors: () => {
            const elefunPrice = competitorPrice(1);

            if (elefunPrice < 200) {
                return elefunPrice;
            }

            return Math.round((elefunPrice - 20) / 10) * 10 - 1;
        },
        inStockCount: () => {
            if (product.stock < 5) {
                return product.stock;
            }

            if (product.stock <= 10) {
                return '5-10';
            }

            if (product.stock <= 25) {
                return '10-25';
            }

            return '25+';
        },
        isNew: () => {
            if (!product.createdAt) {
                throw new Error('createdAt must be defined');
            }

            return moment(product.createdAt).isAfter(
                moment().subtract(14, 'days')
            );
        },
    };
};

export default product;
