// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const AntCarousel = createGlobalStyle`
  .ant-carousel {
    .slick-prev,
    .slick-next {
      z-index: 1;
      width: 48px;
      height: 48px;
      
      &::before {
        font-size: 16px;
        color: #6b7280;
        opacity: 1;
        font-weight: 300;
      }
      
      &:hover::before {
        color: #4b5563;
      }
      
      &.slick-disabled {
        opacity: 0.3;
        cursor: not-allowed;
        
        &::before {
          color: #9ca3af;
        }
      }
    }
  }
`;
