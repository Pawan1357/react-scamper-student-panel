import { removeScroll, textEllipsis } from 'style/Common/Mixin';

import styled from 'styled-components';

export const Wrapper = styled.div`
  &.header-toolbar-wrap {
    .sub-row {
      height: 40px;
      .title-wrap {
        .headerBackBtn {
          svg {
            color: ${({ theme }) => theme.color.primary};
            width: 18px;
            height: 18px;
          }
        }
        &.title-with-cta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .page-title {
          font-size: 22px;
          font-weight: 700;
          line-height: 28px;
          margin: 0;
          color: ${({ theme }) => theme.color.text.primary};
        }
      }

      .cta-wrap {
        ${removeScroll}
        position:absolute;
        right: 10px;
        a {
          display: inline-block;
        }
        .title-btn {
          padding: 12px 25px;
          span {
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
          }
        }
      }
      .btn-wrapper {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
      }
    }
    .btn-wrapper {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    &.header-toolbar-wrap {
      .sub-row {
        align-items: flex-start;
        row-gap: 10px;

        .title-wrap {
          width: 100%;
          .page-title {
            ${textEllipsis}
            font-size: 20px;
          }
        }
        .cta-wrap {
          text-align: end;
          overflow: auto hidden;
        }
      }
    }
  }
`;
