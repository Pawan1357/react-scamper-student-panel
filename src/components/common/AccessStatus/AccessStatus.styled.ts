import styled, { createGlobalStyle } from 'styled-components';

interface IAccessStatusTagProps {
  bgColor: string;
}

export const AccessStatusTag = styled.span<IAccessStatusTagProps>`
  display: inline-block;
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  width: fit-content;
  background-color: ${({ bgColor }) => bgColor};
`;

export const AccessStatusStyles = createGlobalStyle`
  .years-tag {
    padding: 4px 16px;
    margin: 0;
    border-radius: 4px;
  }
`;
