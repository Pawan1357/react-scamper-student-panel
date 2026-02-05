import { createGlobalStyle } from 'styled-components';

export const AntSearchInput = createGlobalStyle`
   .ant-input-search {
        button {
            display: none;
        }
   }

   .ant-input-group-wrapper-outlined .ant-input-group-addon {
        background: none;
   }

   .ant-input-search .ant-input-affix-wrapper {
            border-radius: 20px !important;
    }
`;
