import { Image } from 'antd';

import styled, { createGlobalStyle } from 'styled-components';

export const GalleryFigure = styled.div`
  width: 100%;
  height: 218px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: block;

  /* Ensure Ant Design Image fills the container */
  .ant-image {
    width: 100% !important;
    height: 218px !important;
    display: block !important;

    .ant-image-img {
      width: 100% !important;
      height: 218px !important;
      object-fit: contain !important;
      display: block !important;
    }

    .ant-image-mask {
      width: 100% !important;
      height: 218px !important;
    }

    .ant-image-placeholder {
      width: 100% !important;
      height: 218px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  }
`;

export const GalleryImage = styled(Image)`
  width: 100% !important;
  height: 218px !important;
  display: block !important;
  max-width: 100% !important;

  /* Target all possible wrapper elements */
  & > span,
  & > div {
    width: 100% !important;
    height: 218px !important;
    display: block !important;
    max-width: 100% !important;
  }

  .ant-image {
    width: 100% !important;
    height: 218px !important;
    display: block !important;
    max-width: 100% !important;

    & > img {
      width: 100% !important;
      height: 218px !important;
      object-fit: cover !important;
      display: block !important;
    }
  }

  .ant-image-img {
    width: 100% !important;
    height: 218px !important;
    object-fit: cover !important;
    display: block !important;
    max-width: 100% !important;
  }

  .ant-image-mask {
    width: 100% !important;
    height: 218px !important;
    max-width: 100% !important;
  }

  .ant-image-placeholder {
    width: 100% !important;
    height: 218px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    max-width: 100% !important;
  }

  /* Ensure preview wrapper also respects dimensions */
  .ant-image-preview-wrap {
    .ant-image-preview-img {
      max-width: 90vw;
      max-height: 90vh;
    }
  }
`;

export const GalleryVideo = styled.div`
  width: 100%;
  height: 218px;

  video {
    object-fit: cover;
    width: 100%;
    height: 218px;
  }
`;

export const VideoThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 218px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  display: block;

  video {
    width: 100%;
    height: 218px;
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
  z-index: 5;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const PlayButtonOverlay = styled.button`
  width: 60px;
  height: 60px;
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
    font-size: 24px;
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

export const VideoPlayerModal = styled.div`
  video {
    width: 100%;
    max-width: 100%;
    border-radius: 8px;
  }
`;

export const VideoPlayerModalContainer = createGlobalStyle`
 .video-player-modal {
  &.ant-modal {
    .ant-modal-close {
      top: 8px !important;
      inset-inline-end: 8px !important;
    }
  }

  .ant-modal .ant-modal-close:hover {
    background-color: transparent !important;
  }
 }

 .media-preview-modal {
  &.ant-modal {
    .ant-modal-close {
      top: 8px !important;
      inset-inline-end: 8px !important;
      z-index: 1001;
    }

    .ant-modal-body {
      display: flex !important;
      flex-direction: column !important;
      padding: 24px !important;
      height: 700px !important;
      min-height: 700px !important;
      max-height: 700px !important;
    }

    /* Tablet and below */
    @media (max-width: 1024px) {
      width: 90% !important;
      max-width: 90% !important;

      .ant-modal-body {
        height: 600px !important;
        min-height: 600px !important;
        max-height: 600px !important;
        padding: 20px !important;
      }
    }

    /* Mobile */
    @media (max-width: 768px) {
      width: 95% !important;
      max-width: 95% !important;

      .ant-modal-body {
        height: 70vh !important;
        min-height: 70vh !important;
        max-height: 70vh !important;
        padding: 16px !important;
      }
    }

    /* Small mobile */
    @media (max-width: 480px) {
      width: 98% !important;
      max-width: 98% !important;

      .ant-modal-body {
        height: 65vh !important;
        min-height: 65vh !important;
        max-height: 65vh !important;
        padding: 12px !important;
      }
    }
  }

  .ant-modal .ant-modal-close:hover {
    background-color: transparent !important;
  }
 }
`;

export const MediaPreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
`;

export const MediaPreviewContent = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex: 1;
  overflow: hidden;
`;

export const MediaPreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
`;

export const MediaPreviewVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
`;

export const MediaPreviewNavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => (props.$position === 'left' ? 'left: 16px;' : 'right: 16px;')}
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;

  .anticon {
    font-size: 20px;
    color: #1d3c63;
  }

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    .anticon {
      font-size: 16px;
    }

    ${(props) => (props.$position === 'left' ? 'left: 8px;' : 'right: 8px;')}
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  padding: 0 50px;

  .slick-slide {
    padding: 0 12px;
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

export const FileCard = styled.div`
  padding: 20px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 2px 8px 0px #0000001a;
  margin: 10px 0px;
  .top {
    margin-bottom: 30px;
    text-align: center;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .icon {
    cursor: pointer;
  }
  .fileName {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .name {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4;
  }
  .size {
    font-size: 12px;
    color: #8c8c8c;
  }
`;

export const SlideGrid = styled.div<{ $itemsPerSlide: number; $mode?: 'gallery' | 'resources' }>`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  > * {
    box-sizing: border-box;
    ${(props) => (props.$mode === 'gallery' ? `height: 218px;` : `height: auto;`)}
    overflow: hidden;
    /* Default: 2 items for medium screens */
    width: calc((100% - 16px) / 2) !important;
    max-width: calc((100% - 16px) / 2) !important;
    min-width: 0 !important;
    flex: 0 0 calc((100% - 16px) / 2) !important;
  }

  /* Large screens: 4 items per slide (> 1280px) */
  @media (min-width: 1281px) {
    > * {
      width: calc((100% - 48px) / 4) !important;
      max-width: calc((100% - 48px) / 4) !important;
      min-width: 0 !important;
      flex: 0 0 calc((100% - 48px) / 4) !important;
    }
  }

  /* Extra small screens (mobile): Force single column layout (≤ 480px) */
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0;
    > * {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
      flex: 0 0 100% !important;
      margin-right: 0;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const HoverPreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 15;
  cursor: pointer;

  ${GalleryFigure}:hover & {
    opacity: 1;
  }
`;

export const HoverPreviewText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;

  .anticon {
    font-size: 18px;
  }

  span {
    letter-spacing: 0.3px;
  }

  ${HoverPreviewOverlay}:hover & {
    transform: scale(1.08);
  }
`;
