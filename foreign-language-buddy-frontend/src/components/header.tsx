import React from "react";
import styled from 'styled-components';

const HeaderContainer = styled.div`
            /* Add your CSS styles here */
            background-color: #808080; // changed background color to grey
            color: #00ff00; // changed color to green
            padding: 1em;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

const HeaderTitle = styled.h1`
            /* Add your CSS styles here */
            font-size: 2em;
            color: #ff69b4; // changed color to a more beautiful pink
        `;

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderTitle>English-buddy</HeaderTitle>
        </HeaderContainer>
    )
}

export default Header
