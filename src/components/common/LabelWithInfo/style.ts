import { theme } from 'style/Theme';

import styled from 'styled-components';

export const LabelWrapper = styled.div`
  /* display: flex; */
  flex-direction: column;
  gap: 5px;
  margin-bottom: 8px;
`;

export const LabelInfo = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  margin-bottom: 5px;
`;

export const RequiredLabelAsterisk = styled.span`
  display: inline-block;
  margin-inline-end: 4px;
  color: #f5222d;
  font-size: 14px;
  line-height: 1;
`;

export const LabelText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${theme.color.text.primary};
`;
