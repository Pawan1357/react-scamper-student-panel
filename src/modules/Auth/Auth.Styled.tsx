import { responsive } from 'style/Common/Mixin';
import { theme } from 'style/Theme';

import styled from 'styled-components';

export const FormInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  margin-bottom: 58px;
  color: ${theme.color.text.primary};
  font-family: ${theme?.font?.family?.inter};

  @media (max-width: ${theme.device.md}) {
    margin-bottom: 30px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  line-height: 120%;
  text-align: center;
`;

export const FormDesc = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  text-align: center;
`;

export const FormWrapper = styled.div`
  .ant-form-item-label {
    > label {
      color: ${theme.color.primary};
      font-weight: 500;
      font-size: 14px;

      &.ant-form-item-required::before {
        color: ${theme.color.danger};
        margin-right: 4px;
      }
    }
  }

  .ant-input,
  .ant-input-password {
    border-radius: 8px;
    border: 1px solid ${theme.color.controlOutline};
    padding: 12px 16px;
    font-size: 14px;

    &:focus,
    &:hover {
      border-color: ${theme.color.primary};
      box-shadow: 0 0 0 2px rgba(29, 60, 99, 0.1);
    }

    &::placeholder {
      color: ${theme.color.placeholder};
    }
  }

  .ant-input-password {
    .ant-input-suffix {
      color: ${theme.color.placeholder};
      cursor: pointer;

      &:hover {
        color: ${theme.color.primary};
      }
    }
  }

  .ant-btn-primary {
    background: ${theme.color.primary};
    border-color: ${theme.color.primary};
    border-radius: 8px;
    height: 48px;
    font-weight: 500;
    font-size: 16px;

    &:hover,
    &:focus {
      background: ${theme.color.dark};
      border-color: ${theme.color.dark};
    }
  }

  .forgot-password-link {
    color: ${theme.color.primary};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      color: ${theme.color.dark};
      text-decoration: underline;
    }
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Wrapper = styled.div`
  .profile-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .change-pwd-wrapper {
    display: flex;
    flex-direction: column;
    gap: 34px;
    padding: 40px;

    form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }

  .change-pwd-form {
    max-width: 40%;
  }

  .change-pwd-info {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .form-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 15px;

    .ant-btn {
      min-width: 120px;
      max-width: 200px;
    }
  }

  ${responsive('xl')`
   .change-pwd-form {
    max-width: 50%;
  }
`}

  ${responsive('lg')`
   .change-pwd-form {
    max-width: 60%;
  }
`}

  ${responsive('md')`
   .change-pwd-form {
    max-width: 80%;
  }
`}

  ${responsive('sm')`
   .change-pwd-form {
    max-width: 100%;
  }
    .form-btn-wrapper {
     .ant-btn {
      min-width: 100px;
      max-width: 100%;
     }  
    }
`}
`;
