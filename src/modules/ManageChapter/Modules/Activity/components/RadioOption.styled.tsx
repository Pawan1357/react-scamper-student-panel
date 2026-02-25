import { Image } from 'antd';

import styled from 'styled-components';

export const OptionContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
`;

export const OptionImage = styled(Image)`
  border-radius: 8px;
  object-fit: contain;
  display: block;
`;
