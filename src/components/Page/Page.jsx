import React from 'react';
import {
    AppBar,
    Drawer,
    IconButton,
    makeStyles,
    Toolbar,
} from '@material-ui/core';
import Sidebar from './Sidebar.jsx';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
}));

const Page = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        component={Link}
                        to="/"
                    >
                        <img
                            src="/logo.png"
                            alt=""
                            style={{ maxHeight: '40px' }}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <Sidebar />
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {children}
            </main>
        </div>
    );
};

export default Page;
