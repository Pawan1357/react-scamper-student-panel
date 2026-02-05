import { theme } from 'style/Theme';

import { createGlobalStyle } from 'styled-components';

export const Reset = createGlobalStyle`
* {
    margin: 0px;
    padding: 0px;
    border: none;
    outline: none;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

html {
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
    scroll-behavior: smooth;
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme?.color?.light};
    font-family: ${theme?.font?.family?.sans};
    font-style: normal;
    font-weight: normal;
    line-height: 1.5;
}

a {
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: none;
    }
}

button {
    outline: 0;
    cursor: pointer;

    &:hover,
    &:focus {
        outline: 0;
    }
}

h1,
h2,
h3,
h4,
h5,
h6,
strong,
b {
    font-weight: normal;
    line-height: normal;
    letter-spacing: 1px;
    /* font-family: ${theme?.font.family.inter}; */
    font-weight: 700;
}

p {
    line-height: normal;
}

ul,
ol,
dl {
    list-style-type: none;
}

section,
header,
footer {
    display: inline-block;
    width: 100%;
}

input,
textarea,
select {
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

header {
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

img,
svg {
    display: inline-block;
    max-width: 100%;
    height: auto;
    border-style: none;
    vertical-align: middle;
}

::-moz-selection {
    background: ${theme.color.primary};
    color: ${theme.color.white};
}

::selection {
    background: ${theme.color.primary};
    color: ${theme.color.white};
}

.transition {
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
`;
