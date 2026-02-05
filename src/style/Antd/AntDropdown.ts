import { hexToRGBA } from 'utils/functions';

import { createGlobalStyle } from 'styled-components';

export const AntDropdown = createGlobalStyle`
.ant-dropdown{
    &.layout-header-dropdown{
        top: ${({ theme }) => `${parseInt(theme.size.headerHeight) + 5}px`} !important;
        .ant-dropdown-menu{
            padding: 8px;
            .ant-dropdown-menu-item{
                padding: 8px 12px;

                .anticon{
                    font-size: 16px;
                }
                
                .cta-btn{
                    height: 25px;
                    padding: 0;
                    justify-content: flex-start;
                    color: ${({ theme }) => theme.color.text.primary};
                    
                    &:hover{
                        color: ${({ theme }) => hexToRGBA(theme.color.text.primary, 0.8)};
                    }
                } 
            }
        }

    }
}
`;
