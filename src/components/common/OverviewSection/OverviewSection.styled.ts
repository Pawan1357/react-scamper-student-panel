import { Card } from 'antd';

import styled from 'styled-components';

export const OverviewCard = styled(Card)`
  border-radius: 20px;

  .ant-card-body {
    padding: 40px 73px;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 24px;
    }
  }
`;

export const OverviewBody = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;

  p {
    margin: 0;
    color: #01132a;
    line-height: 24px;
  }
`;
