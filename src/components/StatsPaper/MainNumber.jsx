import React from 'react';
import { Box, Typography } from '@material-ui/core';
import getDiffInPresent from '../../helpers/getDiffInPresent';

const MainNumber = ({ title, nowFormatted, nowNumber, beforeNumber }) => {
    const diff = getDiffInPresent(nowNumber, beforeNumber);
    return (
        <>
            <Typography>
                <strong>{title}</strong>
            </Typography>
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography variant="h4">
                        {nowFormatted || nowNumber}
                    </Typography>
                </Box>
                {diff !== 0 && (
                    <Box color={diff > 0 ? 'success.main' : 'error.main'}>
                        <Typography variant="h5">
                            {diff > 0 && '+'} {(diff * 100).toFixed(2)}%
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default MainNumber;
