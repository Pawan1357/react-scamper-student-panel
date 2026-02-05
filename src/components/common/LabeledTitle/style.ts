import styled from 'styled-components';

export const LabeledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label {
    font-size: 14px;
    color: #6a6a6a;
    font-weight: 500;
  }

  .title {
    word-break: break-all;
    font-size: 20px;
    font-weight: 600;
  }

  .chapter-link {
    word-break: break-all;
    font-size: 16px;
    font-weight: 500;
    color: blue;
  }

  @media (max-width: 1024px) {
    .label {
      font-size: 12px;
    }

    .title {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    .label {
      font-size: 12px;
    }

    .title {
      font-size: 20px;
    }
  }
`;
