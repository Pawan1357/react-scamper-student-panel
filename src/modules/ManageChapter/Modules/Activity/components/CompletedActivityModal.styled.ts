import styled from 'styled-components';

export const CompletedActivityBody = styled.div`
  text-align: center;
  padding: 8px 0 0;

  h3 {
    margin: 0 0 18px;
    font-size: 18px;
    font-weight: 700;
    color: #0f1b53;
  }

  .icon {
    display: flex;
    justify-content: center;
    margin-bottom: 14px;

    svg {
      width: 64px;
      height: 64px;
    }
  }

  .final-score {
    font-size: 16px;
    font-weight: 600;
    color: #1677ff;
    margin-bottom: 6px;
  }

  .total-points {
    font-size: 14px;
    font-weight: 600;
    color: #52c41a;
  }
`;
