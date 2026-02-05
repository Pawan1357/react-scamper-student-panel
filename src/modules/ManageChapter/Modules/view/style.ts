import styled from 'styled-components';

export const ImageWithTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  .chapter-link {
    color: blue;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    cursor: pointer;
  }

  .chapter-link:hover {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const LessonButtonWrapper = styled.div`
  width: 110px;
  max-width: 110px;

  .ant-btn {
    width: 100%;
  }
`;
