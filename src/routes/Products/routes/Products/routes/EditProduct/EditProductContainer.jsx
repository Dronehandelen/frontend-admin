import React from 'react';
import EditProduct from './EditProduct.jsx';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import ProductLoader from './ProductLoader.jsx';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import productQueryFragment from './productQueryFragment.jsx';
import useArray from '../../../../../../hooks/useArray.js';

const editProductMutation = gql`
    mutation EditProduct($product: ProductInput!, $id: Int) {
        product(id: $id, product: $product) {
            ...AdminProductFragment
        }
    }
    ${productQueryFragment}
`;

const useEditProductMutation = () => useMutation(editProductMutation);

const EditProductContainer = ({
    defaultValues,
    productId,
    history,
    location,
    product,
}) => {
    const [
        editProduct,
        { error: editError, loading: saving },
    ] = useEditProductMutation();
    const [state, _setState] = React.useState(defaultValues);

    React.useEffect(() => {
        if (state.images.length === 0 && state.primaryFileId != null) {
            _setState((state) => ({
                ...state,
                primaryFileId: null,
            }));
        }

        if (
            state.images.length > 0 &&
            (state.primaryFileId == null ||
                !state.images.some(
                    (image) => image.fileId === state.primaryFileId
                ))
        ) {
            _setState((state) => ({
                ...state,
                primaryFileId: state.images[0].fileId,
            }));
        }
    }, [_setState, state.primaryFileId, state.images]);

    const accessoryProducts = useArray(state.accessoryProducts);
    const packageProducts = useArray(state.packageProducts);

    const canonicalRedirectProductArray = React.useMemo(() => {
        return state.canonicalRedirectProductId
            ? [{ id: state.canonicalRedirectProductId }]
            : [];
    }, [state.canonicalRedirectProductId]);

    const canonicalRedirectProduct = useArray(canonicalRedirectProductArray);

    return (
        <EditProduct
            product={product}
            state={state}
            setState={(newState) =>
                _setState({
                    ...state,
                    ...newState,
                })
            }
            accessoryProducts={accessoryProducts}
            packageProducts={packageProducts}
            canonicalRedirectProduct={canonicalRedirectProduct}
            save={() => {
                const product = {
                    alias: state.alias,
                    type: state.type,
                    title: state.title,
                    description: JSON.stringify(
                        convertToRaw(state.description.getCurrentContent())
                    ),
                    price: parseInt(state.price),
                    shortDescription: state.shortDescription,
                    isPublished: state.isPublished,
                    imageFileIds: state.images.map((image) => image.fileId),
                    primaryFileId: state.primaryFileId,
                    brandId: state.brandId,
                    gtin: state.gtin,
                    stock: state.stock,
                    backorderMessage:
                        state.backorderMessage === '' ||
                        state.countAvailableForBackorder === 0
                            ? null
                            : state.backorderMessage,
                    countAvailableForBackorder:
                        state.countAvailableForBackorder,
                    categoryIds: state.categoryIds,
                    accessoryProductIds: accessoryProducts.value.map(
                        (v) => v.id
                    ),
                    packageProducts: packageProducts.value,
                    canonicalRedirectProductId:
                        canonicalRedirectProduct.value.length !== 0
                            ? canonicalRedirectProduct.value[0].id
                            : null,
                    tagIds: state.tagIds,
                    isExpired: state.isExpired,
                    thirdPartyDescription: state.thirdPartyDescription,
                    competitorReferences: state.competitorReferences.map(
                        (cr) => ({
                            competitorId: cr.competitorId,
                            reference: cr.reference,
                        })
                    ),
                    width: parseInt(state.width),
                    height: parseInt(state.height),
                    depth: parseInt(state.depth),
                    weight: parseInt(state.weight),
                    warehousePlacement:
                        state.warehousePlacement.length !== 0
                            ? state.warehousePlacement
                            : null,
                };

                editProduct({
                    variables: {
                        id: productId || null,
                        product,
                    },
                })
                    .then(({ data }) => {
                        if (!productId) {
                            history.push(
                                String(location.pathname).replace(
                                    'new',
                                    data.product.id
                                )
                            );
                        }
                    })
                    .catch(() => {});
            }}
            error={editError}
            saving={saving}
        />
    );
};

const Wrapper = (props) => {
    const productId = props.match.params.productId;

    if (productId) {
        return (
            <ProductLoader productId={parseInt(productId)}>
                {(product) => {
                    return (
                        <EditProductContainer
                            productId={product.id}
                            defaultValues={{
                                ...product,
                                categoryIds: product.categories.map(
                                    (c) => c.id
                                ),
                                tagIds: product.tags.map((c) => c.id),
                                accessoryProducts: product.accessories.map(
                                    (c) => ({
                                        id: c.id,
                                    })
                                ),
                                packageProducts: product.packageProducts.map(
                                    (c) => ({
                                        id: c.packageProductId,
                                        amount: c.amount,
                                    })
                                ),
                                price: product.originalPrice,
                                gtin: product.gtin || '',
                                thirdPartyDescription:
                                    product.thirdPartyDescription,
                                width: product.width || '0',
                                height: product.height || '0',
                                depth: product.depth || '0',
                                weight: product.weight || '0',
                                warehousePlacement:
                                    product.warehousePlacement || '',
                                isExpired: !!product.expiredAt,
                                description: EditorState.createWithContent(
                                    convertFromRaw(
                                        JSON.parse(product.description)
                                    )
                                ),
                                primaryFileId:
                                    product.primaryImage &&
                                    product.primaryImage.fileId,
                                backorderMessage:
                                    product.backorderMessage || '',
                            }}
                            product={product}
                            {...props}
                        />
                    );
                }}
            </ProductLoader>
        );
    }

    return (
        <EditProductContainer
            defaultValues={{
                description: EditorState.createEmpty(),
                type: 'product',
                title: '',
                shortDescription: '',
                price: 0,
                stock: 0,
                countAvailableForBackorder: 0,
                isPublished: false,
                isExpired: false,
                images: [],
                categoryIds: [],
                accessoryProducts: [],
                packageProducts: [],
                tagIds: [],
                competitorReferences: [],
                primaryFileId: null,
                brandId: null,
                gtin: '',
                width: '0',
                height: '0',
                depth: '0',
                weight: '0',
                backorderMessage: '',
                thirdPartyDescription: '',
                warehousePlacement: '',
            }}
            {...props}
        />
    );
};

export default Wrapper;
