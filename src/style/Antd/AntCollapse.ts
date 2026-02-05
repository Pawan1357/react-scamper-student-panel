// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const AntCollapse = createGlobalStyle`
  /* Remove all collapse borders */
  .ant-collapse {
    border: none !important;
    background: transparent !important;
  }

  .ant-collapse > .ant-collapse-item {
    border: none !important;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    border-radius: 0 !important;
    padding: 0 !important; /* remove header padding */
    background: transparent !important;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text {
    padding: 0 8px;
  } 
  /* Reduce padding inside panel content */
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0 !important; /* reduced from default ~16px */
  }

  /* Remove border around content box */
  .ant-collapse-content {
    border: none !important;
    background: transparent !important;
  }
`;
