import React from 'react';
import {
    ThemeContext,
    ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import {
    createMuiTheme,
    ThemeProvider as MaterialUiThemeProvider,
} from '@material-ui/core';

const defaultTheme = {
    colors: {
        orange: '#ff8119',
    },
};

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#0277BD',
        },
        secondary: {
            main: '#FFA25A',
        },
    },
    typography: {
        htmlFontSize: 16,
    },
});

export const ThemeProvider = ({ theme = defaultTheme, children }) => (
    <StyledComponentsThemeProvider theme={theme}>
        <MaterialUiThemeProvider theme={muiTheme}>
            {children}
        </MaterialUiThemeProvider>
    </StyledComponentsThemeProvider>
);

export const useTheme = () => {
    const theme = React.useContext(ThemeContext);

    return theme ? theme : defaultTheme;
};
