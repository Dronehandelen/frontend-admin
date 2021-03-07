import React from 'react';
import AddImageModal from './AddImageModal.jsx';
import request from '../../helpers/request.js';
import DefaultHookQuery from '../../containers/DefaultHookQuery.jsx';
import { gql, useQuery } from '@apollo/client';

const GET_IMAGES = gql`
    query GetImages($pagination: PaginationInput!) {
        images(pagination: $pagination) {
            edges {
                node {
                    fileId
                    url
                }
            }
            pageInfo {
                hasNextPage
            }
        }
    }
`;

const uploadImages = async (files) => {
    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        await request({
            method: 'post',
            url: '/images',
            data: formData,
        });
    }
};

const AddImageModalContainer = ({ single = false, ...props }) => {
    const [selectedImageFileIds, setSelectedImageFileIds] = React.useState([]);

    return (
        <DefaultHookQuery
            queryHookData={useQuery(GET_IMAGES, {
                variables: {
                    pagination: {
                        count: 30,
                        after: null,
                    },
                },
            })}
        >
            {({ data, refetch }) => (
                <AddImageModal
                    {...props}
                    single={single}
                    onUpload={(files) => {
                        uploadImages(files).then(() => refetch());
                    }}
                    images={data.images.edges}
                    setSelectedImageFileIds={setSelectedImageFileIds}
                    onImageClick={(image) => {
                        if (single) {
                            return setSelectedImageFileIds([image.node]);
                        }

                        const selected =
                            selectedImageFileIds.findIndex(
                                (x) => x.fileId === image.node.fileId
                            ) !== -1;

                        let newImages = [];
                        if (selected) {
                            newImages = [...selectedImageFileIds].filter(
                                (sifi) => image.node.fileId !== sifi.fileId
                            );
                        } else {
                            newImages = [...selectedImageFileIds, image.node];
                        }

                        setSelectedImageFileIds(newImages);
                    }}
                    selectedImageFileIds={selectedImageFileIds}
                    onAdd={() => props.onAdd(selectedImageFileIds)}
                />
            )}
        </DefaultHookQuery>
    );
};

export default AddImageModalContainer;
