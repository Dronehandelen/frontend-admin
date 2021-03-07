import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const StyledPage = styled.div`
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 0;
`;

const ContentWrapper = styled.div`
    flex: 1;
    background-color: #f7f7f7;
    overflow-y: auto;
`;

const Page = ({ children }) => {
    return (
        <StyledPage>
            <Header />
            <BodyWrapper>
                <Sidebar />
                <ContentWrapper>{children}</ContentWrapper>
            </BodyWrapper>
        </StyledPage>
    );
};

export default Page;
