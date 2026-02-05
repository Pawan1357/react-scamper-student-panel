import { createGlobalStyle } from 'styled-components';

export const AntMenu = createGlobalStyle`
  /* Submenu popup styling for horizontal menu */
  .ant-menu-submenu-popup {
    .ant-menu {
      background: ${({ theme }) => theme.color.white};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 4px 0;
      min-width: 200px;

      .ant-menu-item {
        padding: 0 16px;
        margin: 0;
        height: 40px;
        line-height: 40px;
        color: ${({ theme }) => theme.color.text.primary} !important;
        font-size: 14px;
        font-weight: 600;
        border-radius: 0;
        transition: all 0.2s ease;
        cursor: pointer;

        a {
          color: ${({ theme }) => theme.color.text.primary} !important;
        }

        &:hover {
          color: ${({ theme }) => theme.color.primary} !important;
          background-color: #b0deec !important;

          a {
            color: ${({ theme }) => theme.color.primary} !important;
          }
        }

        &.ant-menu-item-selected {
          color: ${({ theme }) => theme.color.primary} !important;
          background-color: #b0deec !important;
          font-weight: 600;
          border-radius: 0;

          a {
            color: ${({ theme }) => theme.color.primary} !important;
          }

          &::after {
            display: none;
          }

          &:hover {
            background-color: #b0deec !important;
            color: ${({ theme }) => theme.color.primary} !important;

            a {
              color: ${({ theme }) => theme.color.primary} !important;
            }
          }
        }

        &:active {
          color: ${({ theme }) => theme.color.primary} !important;
          background-color: #b0deec !important;

          a {
            color: ${({ theme }) => theme.color.primary} !important;
          }
        }
      }
    }
  }
`;
