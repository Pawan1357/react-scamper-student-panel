import { Modal } from 'antd';
import { theme } from 'style/Theme';

import { styled } from 'styled-components';

export const CommonModalStyle = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 40px 30px 30px;
    .ant-modal-close {
      &:hover {
        background-color: transparent;
      }
    }
  }
  .ant-modal-header,
  .modal-header {
    margin-bottom: 16px;
    .ant-modal-title,
    .modal-title {
      text-align: center;
      font-size: 16px;
      font-style: bold;
      font-weight: 700;
      line-height: 30px;
      font-family: ${theme.font.family.inter};
    }
  }
  .ant-modal-body,
  .modal-body {
    .modal-text {
      color: var(--dark-color);
      font-family: var(--font-ibm-sans);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &.bold {
        font-weight: 600;
      }
    }
    .modal-subtitle {
      color: var(--dark-color);
      font-family: var(--font-ibm-sans);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &.bold {
        font-weight: 600;
      }
    }
    .picture-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .ant-modal-footer,
  .modal-footer {
    width: 100%;
    margin-top: 30px;
  }
`;

export const ModalWrapper = styled(Modal)`
  &.ant-modal {
    &.common-modal {
      ${CommonModalStyle}
      &.logout-modal {
        .modal-body-wrap {
          .modal-icon-wrap {
            .anticon {
              font-size: 30px;
              color: ${({ theme }) => theme.color.primary};
            }
          }
        }
      }

      &.success-modal,
      &.delete-modal,
      &.add-color-modal,
      &.resource-category-modal,
      &.resource-tag-modal {
        .ant-modal-content {
          padding: 35px 50px;
        }

        .ant-modal-footer {
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          .ant-btn {
            &.cta-btn {
              height: 45px;
              margin: 0;
              width: 100%;
            }
          }
        }

        .modal-body-wrap {
          .title {
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
            margin-bottom: 19px;
            text-align: start;
          }
          text-align: center;
          .modal-icon-wrap {
            width: 100%;
            height: 100%;
            max-width: 50px;
            max-height: 50px;
            overflow: hidden;
            border-radius: 50%;
            display: block;
            margin: 0 auto 12px;
          }
          .modal-title,
          .modal-question,
          .modal-desc {
            color: ${({ theme }) => theme.color.primary};
            text-align: center;
          }
          .modal-title {
            font-size: 18px;
          }
          .modal-question {
            font-size: 16px;
            font-weight: 700;
            line-height: 30px;
            margin: 0;
            text-align: center;
          }
          .modal-desc {
            display: block;
            margin-top: 14px;
          }
        }
      }

      &.answer-result-modal {
        .ant-modal-content {
          padding: 20px 24px 16px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
        }

        .ant-modal-body {
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          padding: 0;
          max-height: calc(85vh - 120px);
        }

        .ant-modal-footer {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-shrink: 0;

          .ant-btn {
            &.cta-btn {
              height: 36px;
              margin: 0;
              width: 100%;
              font-size: 14px;
            }
          }
        }

        .modal-body-wrap {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 6px;

          .modal-icon-wrap {
            width: 100%;
            height: 100%;
            max-width: 40px;
            max-height: 40px;
            overflow: hidden;
            border-radius: 50%;
            display: block;
            margin: 0 auto 6px;
          }
          .modal-title {
            font-size: 15px;
            margin-bottom: 6px;
            color: ${({ theme }) => theme.color.primary};
          }
          .modal-desc {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            margin-top: 0;
            max-height: calc(85vh - 200px);
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 4px;
          }
        }

        @media (max-width: 768px) {
          .ant-modal-content {
            padding: 16px 20px 12px;
          }
          .ant-modal-body {
            max-height: calc(85vh - 110px);
          }
        }

        @media (max-width: 480px) {
          .ant-modal-content {
            padding: 14px 18px 10px;
          }
          .ant-modal-body {
            max-height: calc(85vh - 100px);
          }
        }
      }

      &.answer-result-modal-scrollable {
        width: 600px !important;
        max-width: 600px !important;

        .ant-modal-content {
          padding: 20px 24px 16px;
          height: 500px;
          max-height: 500px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .ant-modal-body {
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          padding: 0;
          min-height: 0;
          flex-shrink: 1;

          /* Custom scrollbar styling */
          &::-webkit-scrollbar {
            width: 6px;
          }

          &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          &::-webkit-scrollbar-thumb {
            background: #c8c8c8;
            border-radius: 10px;
          }

          &::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
        }

        .modal-body-wrap {
          .modal-desc {
            overflow: visible;
            max-height: none;
          }
        }

        @media (max-width: 768px) {
          width: 90% !important;
          max-width: 90% !important;

          .ant-modal-content {
            padding: 16px 20px 12px;
            height: 450px;
            max-height: 450px;
          }
        }

        @media (max-width: 480px) {
          width: 95% !important;
          max-width: 95% !important;

          .ant-modal-content {
            padding: 14px 18px 10px;
            height: 400px;
            max-height: 400px;
          }
        }
      }

      &.add-color-modal,
      &.resource-category-modal,
      &.resource-tag-modal {
        .ant-modal-content {
          padding: 20px 30px;
        }
        .ant-modal-header {
          margin-bottom: 25px;
        }

        .ant-form-item-row {
          .ant-form-item-label {
            > label {
              font-size: 12px;
              &::after {
                display: none;
              }
            }
            line-height: normal;
          }
          .ant-form-item-control-input {
            min-height: 30px;
            .ant-input {
              &.color-input {
                min-height: 30px;
                font-size: 12px;
                padding: 3px 6px;
                &::placeholder {
                  font-size: 12px;
                }
              }
            }
          }

          .ant-form-item-explain {
            margin-top: 4px;

            .ant-form-item-explain-error {
              line-height: normal;
            }
          }
        }

        .body-wrap {
          .colors-container {
            .color-box-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2px;
              border: 1px solid transparent;
              cursor: pointer;
              border-radius: 4px;

              .color-box {
                width: 24px;
                height: 24px;
                border-radius: inherit;
              }
            }
          }

          .select-color-input-wrap {
            margin-top: 16px;
            .ant-form-item-row {
              flex-direction: column-reverse;
              .ant-form-item-label {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
`;
