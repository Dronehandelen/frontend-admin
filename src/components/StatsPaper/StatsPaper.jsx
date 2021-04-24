import React from 'react';
import {Box, Paper} from "@material-ui/core";

const StatsPaper = ({children}) => {
    return (
        <Box component={Paper} padding={2} marginBottom={1}>
            {children}
        </Box>
    );
};

export default StatsPaper;