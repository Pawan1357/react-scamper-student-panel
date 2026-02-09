import { Layout } from 'antd';
import { responsive } from 'style/Common/Mixin';
import { theme } from 'style/Theme';

import { styled } from 'styled-components';

export const StyledLayout = styled(Layout)`
  --headerHeight: 70px;
  --footerHeight: 60px;
  --bodyHeight: calc(100vh - var(--headerHeight) - var(--footerHeight));

  &.ant-layout {
    min-height: 100%;

    /* Header */
    .ant-layout-header {
      height: var(--headerHeight);
      background: ${theme.color.primaryLight};
      padding: 0 33px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: var(--headerHeight);
      position: relative;
      z-index: 1001;
      overflow: visible;

      .header-left-section {
        display: flex;
        align-items: center;
        gap: 32px;
        flex: 1;
      }

      .header-logo {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .mobile-menu-button {
        display: none;
        font-size: 20px;
        color: ${theme.color.text.primary};
        padding: 8px;
        height: auto;
        width: auto;
        transition: all 0.3s ease;

        &:hover {
          color: ${theme.color.primary};
        }
      }

      .header-navigation {
        padding: 0 20px;

        .header-nav-menu {
          display: flex;
          justify-content: flex-start;
          background: transparent;
          border-bottom: none;
          min-width: 0;
          width: 100%;
          .ant-menu-item {
            padding: 0 16px;
            margin: 0;
            color: ${theme.color.text.primary};
            font-size: 14px;
            font-weight: 600;
            border-bottom: none;
            position: relative;
            border-radius: 0;
            transition: all 0.2s ease;

            &:hover {
              color: ${theme.color.primary};
              background-color: #b0deec;
            }

            &.ant-menu-item-selected {
              color: ${theme.color.primary};
              background-color: #b0deec;
              font-weight: 600;
              border-radius: 0;

              &::after {
                display: none;
              }

              &:hover {
                background-color: #b0deec;
                color: ${theme.color.primary};
              }
            }
          }

          .ant-menu-submenu {
            padding: 0;
            margin: 0;
            border-bottom: none;
            position: relative;
            border-radius: 0;
            transition: all 0.2s ease;

            .ant-menu-submenu-title {
              padding: 0 16px;
              margin: 0;
              color: ${theme.color.text.primary} !important;
              font-size: 14px;
              font-weight: 600;
              border-bottom: none;
              transition: all 0.2s ease;
            }

            &:hover {
              .ant-menu-submenu-title {
                color: ${theme.color.primary} !important;
                background-color: #b0deec !important;
              }
            }

            &.ant-menu-submenu-selected,
            &.ant-menu-submenu-open {
              .ant-menu-submenu-title {
                color: ${theme.color.primary} !important;
                background-color: #b0deec !important;
                font-weight: 600;
              }
            }

            &.ant-menu-submenu-selected {
              &:hover {
                .ant-menu-submenu-title {
                  background-color: #b0deec !important;
                  color: ${theme.color.primary} !important;
                }
              }
            }
          }
        }
      }

      /* Responsive styles */
      ${responsive('lg')`
        padding: 0 20px;

        .header-left-section {
          gap: 16px;
        }

        .header-navigation {
          padding: 0 10px;

          .header-nav-menu {
            .ant-menu-item {
              padding: 0 12px;
              font-size: 13px;
            }

            .ant-menu-submenu .ant-menu-submenu-title {
              padding: 0 12px;
              font-size: 13px;
            }
          }
        }
      `}

      ${responsive('md')`
        padding: 0 16px;

        .header-left-section {
          gap: 12px;
        }

        .desktop-nav {
          display: none !important;
        }

        .header-navigation {
          display: none;
        }
      `}

      ${responsive('sm')`
        padding: 0 12px;
        height: 60px;
        line-height: 60px;

        .header-left-section {
          gap: 8px;
        }

        .header-controller-wrap {
          gap: 12px !important;
        }
      `}

      .header-title {
        font-weight: 400;
        font-size: 20px;
        line-height: 26px;
        color: ${theme?.color?.black};
      }

      .profile-avatar {
        padding: 8px;
        border: 1px solid ${theme?.color?.black};
        background-color: ${theme?.color?.white};
      }

      .header-controller-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 25px;
        flex-shrink: 0;

        ${responsive('md')`
          .mobile-menu-button {
            display: block !important;
          }
        `}

        ${responsive('sm')`
          gap: 12px;
        `}

        .controller-item {
          & + .controller-item {
            padding-inline-start: 25px;
            border-inline-start: 1px solid #d2d2d2;

            ${responsive('sm')`
              padding-inline-start: 12px;
            `}
          }
        }
        .ant-badge {
          &.notification-count-badge {
            cursor: pointer;
            .ant-badge-count {
              padding: 0 4px;
              &.ant-badge-count-sm {
                font-size: 10px;
              }
            }
          }
        }
      }

      .user-avatar img {
        cursor: pointer;
        object-fit: contain !important;
        width: 100%;
        height: 100%;
      }
    }

    /* Content */
    .ant-layout-content {
      height: calc(100vh - var(--headerHeight));
      overflow: auto;

      ${responsive('sm')`
        height: calc(100vh - 60px);
      `}
    }
    /* Footer */
    .ant-layout-footer {
      height: var(--footerHeight);
      text-align: center;
    }
  }
  .content-body {
    padding: 0;
  }
  .content-wrap {
    padding: 15px 33px;

    ${responsive('md')`
      padding: 15px 20px;
    `}

    ${responsive('sm')`
      padding: 15px 12px;
    `}
  }

  /* Mobile Navigation Menu */
  .mobile-nav-menu-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${theme.color.white};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    overflow: hidden;
    transform-origin: top;
    animation: slideDownMenu 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;

    ${responsive('sm')`
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    `}

    &.closing {
      animation: slideUpMenu 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .mobile-nav-menu {
      border-right: none;
      background: ${theme.color.white};
      padding: 16px 16px;

      .ant-menu-item {
        height: 56px;
        line-height: 56px;
        margin: 0 12px 6px 0;
        padding: 0 20px;
        color: ${theme.color.text.primary};
        font-size: 15px;
        font-weight: 600;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: ${theme.color.white};
        display: flex;
        align-items: center;

        a {
          color: ${theme.color.text.primary} !important;
        }

        &:hover {
          color: ${theme.color.primary} !important;
          background-color: #b0deec;
          transform: translateX(4px);

          a {
            color: ${theme.color.primary} !important;
          }
        }

        &.ant-menu-item-selected {
          color: ${theme.color.primary} !important;
          background-color: #b0deec;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(29, 60, 99, 0.15);

          a {
            color: ${theme.color.primary} !important;
          }

          &::after {
            display: none;
          }

          &:hover {
            background-color: #b0deec;
            transform: translateX(4px);

            a {
              color: ${theme.color.primary} !important;
            }
          }
        }
      }

      .ant-menu-submenu {
        margin: 0;

        .ant-menu-submenu-title {
          height: 56px;
          line-height: 56px;
          padding: 0 20px;
          margin: 0;
          color: ${theme.color.text.primary} !important;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: ${theme.color.white};
          display: flex;
          align-items: center;
        }

        &:hover {
          .ant-menu-submenu-title {
            color: ${theme.color.primary} !important;
            background-color: #b0deec;
            transform: translateX(4px);
          }
        }

        &.ant-menu-submenu-selected,
        &.ant-menu-submenu-open {
          .ant-menu-submenu-title {
            color: ${theme.color.primary} !important;
            background-color: #b0deec;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(29, 60, 99, 0.15);
          }
        }

        &.ant-menu-submenu-selected {
          &:hover {
            .ant-menu-submenu-title {
              background-color: #b0deec;
              color: ${theme.color.primary} !important;
              transform: translateX(4px);
            }
          }
        }

        .ant-menu {
          background: ${theme.color.white};
          padding-left: 0;

          .ant-menu-item {
            height: 48px;
            line-height: 48px;
            margin: 0 12px 4px 4px;
            padding: 0 20px;
            color: ${theme.color.text.primary} !important;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: ${theme.color.white};
            display: flex;
            align-items: center;

            a {
              color: ${theme.color.text.primary} !important;
            }

            &:hover {
              color: ${theme.color.primary} !important;
              background-color: #b0deec;
              transform: translateX(4px);

              a {
                color: ${theme.color.primary} !important;
              }
            }

            &.ant-menu-item-selected {
              margin-top: 5px;
              color: ${theme.color.primary} !important;
              background-color: #b0deec;
              font-weight: 600;
              box-shadow: 0 2px 8px rgba(29, 60, 99, 0.15);

              a {
                color: ${theme.color.primary} !important;
              }

              &::after {
                display: none;
              }

              &:hover {
                background-color: #b0deec;
                transform: translateX(4px);

                a {
                  color: ${theme.color.primary} !important;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes slideDownMenu {
    0% {
      max-height: 0;
      opacity: 0;
      transform: scaleY(0);
    }
    100% {
      max-height: 1000px;
      opacity: 1;
      transform: scaleY(1);
    }
  }

  @keyframes slideUpMenu {
    0% {
      max-height: 1000px;
      opacity: 1;
      transform: scaleY(1);
    }
    100% {
      max-height: 0;
      opacity: 0;
      transform: scaleY(0);
    }
  }
`;
