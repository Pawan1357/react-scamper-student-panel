import { Typography } from 'antd';

import styled from 'styled-components';

export const FaqDetailCardWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 40px 73px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FaqDetailBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FaqTitle = styled(Typography.Title)`
  margin-bottom: 0 !important;
  font-size: 20px !important;
  font-weight: 600 !important;
`;

export const FaqMetadata = styled.div`
  padding: 20px 0;
`;

export const MediaSection = styled.div`
  width: 100%;
  margin: 24px 0;
`;

export const VideoPlayerModal = styled.div`
  video {
    width: 100%;
    max-width: 100%;
    border-radius: 8px;
  }
`;
