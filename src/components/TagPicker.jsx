import React from 'react';
import DefaultHookQuery from '../containers/DefaultHookQuery';
import styled from 'styled-components';
import cn from 'classnames';
import {
    Alert,
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
} from 'reactstrap';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_TAGS_QUERY = gql`
    query getTags {
        tagGroups {
            id
            name
            tags {
                id
                name
            }
        }
    }
`;

const TAG_MUTATION = gql`
    mutation Tag($name: String!, $tagGroupId: Int!) {
        tag(name: $name, tagGroupId: $tagGroupId) {
            id
            name
        }
    }
`;

const TAG_GROUP_MUTATION = gql`
    mutation TagGroup($name: String!) {
        tagGroup(name: $name) {
            id
            name
        }
    }
`;

const MobileLink = styled.div`
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

const TagGroup = ({ tagGroup, selectedTags, setSelectedTags, createTag }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [tagName, setTagName] = React.useState('');

    return (
        <div>
            <MobileLink
                onClick={() => {
                    setIsExpanded(!isExpanded);
                }}
            >
                <div className="d-inline-block" style={{ width: 18 }}>
                    <i
                        className={cn('fa', {
                            'fa-caret-right': !isExpanded,
                            'fa-caret-down': isExpanded,
                        })}
                    />
                </div>
                <div className="d-inline-block">{tagGroup.name}</div>
            </MobileLink>

            {isExpanded && (
                <div className="pl-3">
                    {tagGroup.tags.map((tag) => {
                        const isSelected = selectedTags.indexOf(tag.id) !== -1;

                        const toggle = () =>
                            setSelectedTags(
                                isSelected
                                    ? [...selectedTags].filter(
                                          (id) => id !== tag.id
                                      )
                                    : [...selectedTags, tag.id]
                            );

                        return (
                            <MobileLink key={tag.id} onClick={toggle}>
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
                                </div>{' '}
                                {tag.name}
                            </MobileLink>
                        );
                    })}
                    <div className="mt-2">
                        <InputGroup>
                            <Input
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                                placeholder="lag ny tag"
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    color="secondary"
                                    onClick={() =>
                                        createTag(tagName, tagGroup.id)
                                    }
                                >
                                    Lagre
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            )}
        </div>
    );
};

const Picker = ({
    tagGroups,
    selectedTags,
    setSelectedTags,
    error,
    createTag,
    createTagGroup,
}) => {
    const [tagGroupName, setTagGroupName] = React.useState('');
    return (
        <div>
            {error && <Alert color="danger">Noe skjedde</Alert>}
            {tagGroups.map((tagGroup) => (
                <TagGroup
                    tagGroup={tagGroup}
                    key={`${tagGroup.id}`}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    createTag={createTag}
                />
            ))}
            <div className="mt-2">
                <InputGroup>
                    <Input
                        value={tagGroupName}
                        onChange={(e) => setTagGroupName(e.target.value)}
                        placeholder="lag ny tag group"
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            color="secondary"
                            onClick={() => createTagGroup(tagGroupName)}
                        >
                            Lagre
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    );
};

const TagPicker = ({ selectedTags, setSelectedTags }) => {
    const [createTag, { error: tagError }] = useMutation(TAG_MUTATION);
    const [createTagGroup, { error: tagGroupError }] = useMutation(
        TAG_GROUP_MUTATION
    );

    return (
        <DefaultHookQuery queryHookData={useQuery(GET_TAGS_QUERY)}>
            {({ data, refetch }) => (
                <Picker
                    tagGroups={data.tagGroups}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    error={tagError || tagGroupError}
                    createTag={(name, tagGroupId) =>
                        createTag({
                            variables: { name, tagGroupId },
                        }).then(() => refetch())
                    }
                    createTagGroup={(name) =>
                        createTagGroup({
                            variables: { name },
                        }).then(() => refetch())
                    }
                />
            )}
        </DefaultHookQuery>
    );
};

export default TagPicker;
