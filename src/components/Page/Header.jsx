import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    background-color: #212121;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 66px;
    color: #878787;
`;

const Logo = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;

    img {
        max-width: 200px;
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <Logo>
                <img src="/logo.png" alt="" />
            </Logo>
        </StyledHeader>
    );
};

export default Header;
