import { createGlobalStyle } from 'styled-components';

export const AntTabs = createGlobalStyle`
  .ant-tabs-top >.ant-tabs-nav::before, .ant-tabs-top >div>.ant-tabs-nav::before {
        border-bottom: none;
    }

  /* Responsive tabs scrolling */
  .ant-tabs-nav-wrap {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(39, 152, 205, 0.3) transparent;
    padding-right: 20px;
    margin-right: -20px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(39, 152, 205, 0.3);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(39, 152, 205, 0.5);
    }
  }

  .ant-tabs-nav-list {
    flex-wrap: nowrap;
    min-width: max-content;
    padding-right: 20px;
  }

  .ant-tabs-tab {
    flex-shrink: 0;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .ant-tabs-nav-wrap {
      padding-bottom: 4px;
      padding-right: 16px;
      margin-right: -16px;
    }

    .ant-tabs-nav-list {
      padding-right: 16px;
    }
  }

  @media (max-width: 480px) {
    .ant-tabs-nav-wrap {
      padding-right: 12px;
      margin-right: -12px;
    }

    .ant-tabs-nav-list {
      padding-right: 12px;
    }
  }
`;
