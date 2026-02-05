import { theme } from 'style/Theme';

import { styled } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 210px);
  overflow: hidden auto;
  padding: 30px 10px;

  .error-img {
    text-align: center;
    .animateNumber {
      display: flex;
      align-items: center;
      justify-content: center;
      .number {
        font-size: clamp(3vw, 160px, 16vw);
        letter-spacing: 0.1em;
        margin: 0;
        opacity: 0;
        color: ${theme?.color?.primary};
        animation: bounceIn 0.5s ease-in-out;
        animation-fill-mode: forwards;

        &:nth-child(2) {
          animation-delay: 0.5s;
        }

        &:nth-child(3) {
          animation-delay: 1s;
        }

        @keyframes bounceIn {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          60% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      }
    }
  }
  .error-content {
    text-align: center;
    margin-top: 1em;
    h3 {
      margin-bottom: 0.3em;
      font-weight: 500;
      font-size: clamp(1.5vw, 26px, 6vw);
      color: ${theme?.color?.primary};
      opacity: 0.8;
    }
    p {
      margin-bottom: 1.2em;
      font-weight: 400;
      font-size: clamp(0.8vw, 16px, 3vw);
      color: ${theme?.color?.primary};
      opacity: 0.6;
    }
  }
`;
