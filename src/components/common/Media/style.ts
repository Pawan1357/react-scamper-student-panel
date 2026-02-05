import { Card } from 'antd';

import styled from 'styled-components';

export const CarouselContainer = styled.div`
  position: relative;
  padding: 0 50px;

  .slick-slide {
    width: fit-content !important;
  }

  .slick-slider {
    padding-bottom: 12px;
    position: relative;
  }

  .slick-list {
    margin: 0 -12px;
  }

  /* Use default arrows but make them visible with gray color */
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

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }

  .slick-dots li button {
    background: rgba(31, 59, 179, 0.25);
  }

  .slick-dots li.slick-active button {
    background: #1f3bb3;
  }

  @media (max-width: 768px) {
    padding: 0 40px;

    .slick-prev {
      left: -40px;
    }

    .slick-next {
      right: -40px;
    }
  }
`;

export const GalleryCard = styled(Card)`
  .ant-image {
    width: 218px;
    height: 218px;
  }

  .ant-image-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
`;

export const ResourceCard = styled(Card)`
  border-radius: 18px;
  text-align: center;
  border: none;
  padding: 4px;
  background: linear-gradient(180deg, rgba(255, 244, 248, 0.95) 0%, #ffffff 40%);
  box-shadow: 0 16px 30px rgba(183, 34, 87, 0.1);

  .ant-card-body {
    padding: 24px 12px;
  }
`;

export const ResourceIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 28px;
  color: #ffffff;
  background: linear-gradient(135deg, #ff5a87 0%, #ff2d5f 100%);
  box-shadow: 0 16px 36px rgba(255, 67, 106, 0.35);
  margin: 0 auto 12px;
`;
