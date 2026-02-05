import { createGlobalStyle } from 'styled-components';

export const AntSpin = createGlobalStyle`
.ant-spin-nested-loading >div>.ant-spin .ant-spin-dot {
    position: absolute;
    top: 50%;
    inset-inline-start: 60px;
    margin: -13.75px;
}

.image-spin-loader {
    .ant-spin-dot-holder {
        position: static;
    }
}
`;
