import { Card } from 'antd';

import styled from 'styled-components';

export const CurriculamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const CurriculamItem = styled(Card)`
  border-radius: 20px;
  border: none;
  padding: 20px 24px;
  background: #f0f2f5;

  .curriculam-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;

    button {
      min-width: 120px;
    }
  }

  .curriculam-details-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .curriculam-details {
    display: flex;
    gap: 20px;
  }

  .curriculam-detail {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .curriculam-detail-label {
    font-size: 14px;
    color: #6a6a6a;
  }

  .curriculam-detail-item {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #6a6a6a;

    .value-text {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #2798cd; /* blue or anything you want */
    }
  }
`;
