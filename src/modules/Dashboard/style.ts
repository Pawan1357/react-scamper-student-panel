import styled from 'styled-components';

export const TabWrapper = styled.div`
  .table-link {
    color: #0066c5;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    cursor: pointer;
  }

  .ant-tabs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ant-tabs-nav {
    margin: 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  .ant-tabs-nav-wrap {
    overflow: visible;
  }

  .ant-tabs-nav-list {
    flex-wrap: nowrap;
    padding-right: 48px;
  }

  .ant-tabs-tab {
    font-weight: 600;
    font-size: 16px;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #2798cd;
  }

  .ant-tabs-ink-bar {
    background: #2798cd;
  }
`;

export const IconWrapper = styled.span`
  color: #9ea0aa;
  font-size: 18px;
  margin-right: 16px;
`;

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
