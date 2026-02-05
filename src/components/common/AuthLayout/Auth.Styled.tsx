import Link from 'antd/es/typography/Link';
import { theme } from 'style/Theme';

import { styled } from 'styled-components';

import authBg from '/asset/images/auth-bg.png';

export const AuthWrapper = styled.section`
  &.authLayout {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: url(${authBg}) center/cover no-repeat;
    .logo-container {
      position: absolute;
      top: 40px;
      left: 40px;
      z-index: 10;
    }

    .authWrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      max-width: 500px;
      margin: 0 auto;
      width: 100%;

      &.authBg {
        background: transparent;
        border-radius: 16px;
        padding: 48px 40px;
        position: relative;
        z-index: 5;
        color: ${theme.color.text.primary};
        font-size: 40px;
      }
    }
  }
`;

export const LoginFormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  width: 100%;

  .login-left-section {
    width: 376px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: ${theme.device.md}) {
    flex-direction: column;
    gap: 16px;

    .login-left-section {
      width: 100%;
    }
  }
`;

export const VerticalDivider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 1px;
  padding: 0 20px;
  position: relative;

  .divider-line {
    flex: 1;
    width: 1px;
    background-color: ${theme.color.controlOutline};
    min-height: 50px;
  }

  .divider-text {
    padding: 10px 0;
    color: ${theme.color.text.primary};
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  @media (max-width: ${theme.device.md}) {
    flex-direction: row;
    width: 100%;
    padding: 20px 0;

    .divider-line {
      width: 100%;
      height: 1px;
      min-height: 1px;
    }

    .divider-text {
      padding: 0 15px;
    }
  }
`;

export const SocialButtonsWrapper = styled.div`
  width: 376px;

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 280px;

  .social-button {
    background: ${theme.color.white};
    border: 1px solid ${theme.color.controlOutline};
    border-radius: 20px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    .button-content {
      display: flex;
      align-items: center;
      gap: 12px;
      color: ${theme.color.text.primary};
      font-size: 16px;
      font-weight: 500;

      svg {
        flex-shrink: 0;
      }
    }

    &:hover {
      border-color: ${theme.color.primary};
      background: ${theme.color.white};
    }

    &:focus {
      border-color: ${theme.color.primary};
      background: ${theme.color.white};
    }
  }

  @media (max-width: ${theme.device.md}) {
    width: 100%;
    min-width: unset;
  }
`;

export const LinkWrapper = styled(Link)`
  && {
    color: ${theme.color.text.primary};
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
    text-align: right;
    width: fit-content;
    transition: color 0.3s ease;

    &:hover {
      cursor: pointer;
      color: ${theme.color.text.primary};
    }
  }
`;
