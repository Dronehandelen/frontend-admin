import React from 'react';
import {
    ThemeContext,
    ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

const defaultTheme = {
    colors: {
        orange: '#ff8119',
    },
};

export const ThemeProvider = ({ theme = defaultTheme, children }) => (
    <StyledComponentsThemeProvider theme={theme}>
        {children}
    </StyledComponentsThemeProvider>
);

export const useTheme = () => {
    const theme = React.useContext(ThemeContext);

    return theme ? theme : defaultTheme;
};
