import React from 'react';
import styled from 'styled-components';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

const StyledSidebar = styled.ul`
    width: 225px;
    list-style: none;
    padding-left: 0;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    color: white;
    margin: 0;
`;

const MainListItem = styled.li`
    padding: 0 15px;
`;

const Header = styled(MainListItem)`
    padding-top: 11px;
    padding-bottom: 11px;
    color: ${(props) => props.theme.colors.orange};
`;

const StyledMainLink = styled(MainListItem)`
    cursor: pointer;
    padding-top: 7px;
    padding-bottom: 7px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    &.selected {
        background-color: ${(props) => props.theme.colors.orange};
    }
`;

const LinkBlock = styled.li`
    cursor: pointer;
`;

const StyledLinkBlockLink = styled.li`
    padding: 5px 15px 5px 30px;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
`;

const LinkBlockList = styled.ul`
    list-style: none;
    padding-left: 0;
    color: #878787;
    display: none;

    &.expanded {
        display: block;
    }
`;

const Separator = styled(MainListItem)`
    margin: 10px 0;
    border-bottom: 1px solid #878787;
`;

const MainLink = ({ to, onClick, children }) => {
    const history = useHistory();
    const location = useLocation();

    return (
        <StyledMainLink
            onClick={() => {
                if (onClick) {
                    onClick();
                } else if (to) {
                    history.push(to);
                }
            }}
            className={cn({
                selected: matchPath(location.pathname, {
                    path: to,
                }),
            })}
        >
            {children}
        </StyledMainLink>
    );
};

const LinkBlockLink = ({ to, children }) => {
    const history = useHistory();

    return (
        <StyledLinkBlockLink onClick={() => to && history.push(to)}>
            {children}
        </StyledLinkBlockLink>
    );
};

const Sidebar = () => {
    const [currentlyExpandedName, setCurrentlyExpandedName] = React.useState(
        null
    );

    return (
        <StyledSidebar>
            <Header>Main</Header>
            <MainLink to="/dashboard">Dashboard</MainLink>
            <MainLink
                onClick={() => {
                    setCurrentlyExpandedName(
                        currentlyExpandedName === 'ecommerce'
                            ? null
                            : 'ecommerce'
                    );
                }}
                to="/ecommerce"
            >
                Ecommerce
            </MainLink>
            <LinkBlock>
                <LinkBlockList
                    className={cn({
                        expanded: currentlyExpandedName === 'ecommerce',
                    })}
                >
                    <LinkBlockLink to="/ecommerce/products">
                        Produkter
                    </LinkBlockLink>
                    <LinkBlockLink to="/ecommerce/old-products">
                        Gamle produkter
                    </LinkBlockLink>
                    <LinkBlockLink to="/ecommerce/categories">
                        Kategorier
                    </LinkBlockLink>
                    <LinkBlockLink to="/ecommerce/orders">Ordre</LinkBlockLink>
                    <LinkBlockLink to="/ecommerce/articles">
                        Artikler
                    </LinkBlockLink>
                    <LinkBlockLink to="/ecommerce/stats">Stats</LinkBlockLink>
                    <LinkBlockLink to="/ecommerce/stock-manager">
                        Stock manager
                    </LinkBlockLink>
                    <LinkBlockLink to="/ecommerce/supplier-orders">
                        Supplier orders
                    </LinkBlockLink>
                </LinkBlockList>
            </LinkBlock>
            <MainLink
                onClick={() => {
                    setCurrentlyExpandedName(
                        currentlyExpandedName === 'stats' ? null : 'stats'
                    );
                }}
                to="/stats"
            >
                Stats
            </MainLink>
            <LinkBlock>
                <LinkBlockList
                    className={cn({
                        expanded: currentlyExpandedName === 'stats',
                    })}
                >
                    <LinkBlockLink to="/stats/searches">Søk</LinkBlockLink>
                </LinkBlockList>
            </LinkBlock>
            <Separator />
        </StyledSidebar>
    );
};

export default Sidebar;
