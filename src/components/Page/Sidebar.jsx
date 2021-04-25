import React from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import {
    Assessment,
    Dashboard,
    ExpandLess,
    ExpandMore,
    LocalOffer,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    parentItem: {
        fontWeight: 'bold',
    },
}));

const Sidebar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [currentlyExpandedName, setCurrentlyExpandedName] = React.useState(
        null
    );

    React.useEffect(() => {
        setCurrentlyExpandedName(null);
    }, [location]);

    const links = [
        { name: 'Dashboard', to: '/dashboard', icon: <Dashboard /> },
        {
            name: 'Produkter',
            to: '/products',
            icon: <LocalOffer />,
            subLinks: [
                { name: 'Alle', to: '/all' },
                { name: 'Gamle', to: '/old' },
                { name: 'Overvåket', to: '/monitored' },
            ],
        },
        {
            name: 'Stats',
            to: '/stats',
            icon: <Assessment />,
            subLinks: [{ name: 'Søk', to: '/searches' }],
        },
        {
            name: 'Ecommerce',
            to: '/ecommerce',
            icon: <LocalOffer />,
            subLinks: [
                { name: 'Produkter', to: '/products' },
                { name: 'Merker', to: '/brands' },
                { name: 'Gamle produkter', to: '/old-products' },
                { name: 'Kategorier', to: '/categories' },
                { name: 'Ordre', to: '/orders' },
                { name: 'Artikler', to: '/articles' },
                { name: 'Stats', to: '/stats' },
                { name: 'Stock manager', to: '/stock-manager' },
                { name: 'Supplier orders', to: '/supplier-orders' },
            ],
        },
    ];

    return (
        <List dense>
            {links.map(({ name, icon, to, subLinks }) => {
                const isInPath = !!matchPath(location.pathname, {
                    path: to,
                    strict: false,
                });

                const isExpanded = isInPath || currentlyExpandedName === name;

                if (subLinks) {
                    return (
                        <React.Fragment key={name}>
                            <ListItem
                                button
                                selected={isInPath}
                                onClick={() => {
                                    setCurrentlyExpandedName(
                                        currentlyExpandedName === name
                                            ? null
                                            : name
                                    );
                                }}
                            >
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText
                                    primary={name}
                                    primaryTypographyProps={{
                                        className: classes.parentItem,
                                    }}
                                    inset={!icon}
                                />
                                {isExpanded ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse
                                in={isExpanded}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding dense>
                                    {subLinks.map((subLink) => {
                                        const subTo = to + subLink.to;
                                        const isInSubPath = !!matchPath(
                                            location.pathname,
                                            {
                                                path: subTo,
                                                strict: false,
                                            }
                                        );

                                        return (
                                            <ListItem
                                                key={subLink.name}
                                                button
                                                onClick={() =>
                                                    history.push(subTo)
                                                }
                                                selected={isInSubPath}
                                            >
                                                <ListItemText
                                                    primary={subLink.name}
                                                    inset
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    );
                }

                return (
                    <ListItem
                        key={name}
                        button
                        selected={isInPath}
                        onClick={() => history.push(to)}
                    >
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText
                            primary={name}
                            primaryTypographyProps={{
                                className: classes.parentItem,
                            }}
                            inset={!icon}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default Sidebar;
