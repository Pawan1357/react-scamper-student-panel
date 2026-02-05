import styled from 'styled-components';

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 50px;

  .ant-carousel {
    width: 100%;
  }

  .slick-slide {
    padding: 0 4px;
  }

  .slick-list {
    margin: 0 -4px;
  }

  /* Default Ant Design Carousel arrows positioned on sides */
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

export const CarouselItem = styled.div<{ $itemWidth?: string }>`
  flex: 0 0 ${(props) => props.$itemWidth || 'auto'};
  width: ${(props) => props.$itemWidth || 'auto'};
  max-width: ${(props) => props.$itemWidth || 'auto'};
  position: relative;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  box-sizing: border-box;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Ensure Ant Design Image component fills container */
  .ant-image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .ant-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1024px) {
    height: 280px;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const VideoThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: #000;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0.7;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover video {
    opacity: 0.9;
  }
`;

export const VideoThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const PlayButtonOverlay = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  .anticon {
    font-size: 32px;
    color: #1d3c63;
    margin-left: 4px;
  }

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;
