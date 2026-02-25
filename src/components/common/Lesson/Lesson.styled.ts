import { Card } from 'antd';

import styled from 'styled-components';

export const ContentSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LessonCard = styled(Card)`
  border-radius: 20px;
  background: none;
  box-shadow: none !important;

  .ant-card-body {
    padding: 0px;
  }

  .ant-tabs-nav {
    padding: 0px 10px;
  }

  .ant-tabs-nav-wrap {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(80, 171, 214, 0.3) transparent;
    padding-right: 20px;
    margin-right: -20px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(80, 171, 214, 0.3);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(80, 171, 214, 0.5);
    }
  }

  .ant-tabs-nav-list {
    flex-wrap: nowrap;
    min-width: max-content;
    padding-right: 20px;
  }

  .ant-tabs-tab {
    font-weight: 600;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #50abd6;
  }

  .ant-tabs-ink-bar {
    background: #50abd6;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 24px;
    }

    .ant-tabs-nav-wrap {
      padding-bottom: 4px;
      padding-right: 16px;
      margin-right: -16px;
    }

    .ant-tabs-nav-list {
      padding-right: 16px;
    }

    .ant-tabs-tab {
      font-size: 14px;
      padding: 8px 12px;
    }
  }

  @media (max-width: 480px) {
    .ant-tabs-nav-wrap {
      padding-right: 12px;
      margin-right: -12px;
    }

    .ant-tabs-nav-list {
      padding-right: 12px;
    }

    .ant-tabs-tab {
      font-size: 12px;
      padding: 6px 10px;
    }
  }
`;

export const ContentTabsCard = styled(Card)`
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(37, 56, 115, 0.08);
  padding: 40px 73px;

  .ant-card-body {
    padding: 0;
  }

  .ant-tabs-nav {
    margin: 0;
    padding: 0px 10px;
  }

  .ant-tabs-nav-wrap {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(80, 171, 214, 0.3) transparent;
    padding-right: 20px;
    margin-right: -20px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(80, 171, 214, 0.3);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(80, 171, 214, 0.5);
    }
  }

  .ant-tabs-nav-list {
    flex-wrap: nowrap;
    min-width: max-content;
    padding-right: 20px;
  }

  .ant-tabs-top {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .ant-tabs-tab {
    font-weight: 600;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #50abd6;
  }

  .ant-tabs-ink-bar {
    background: #50abd6;
  }

  @media (max-width: 768px) {
    .ant-tabs-nav {
      padding: 16px 16px 0;
    }

    .ant-tabs-top {
      gap: 24px;
    }

    .ant-tabs-nav-wrap {
      padding-bottom: 4px;
      padding-right: 16px;
      margin-right: -16px;
    }

    .ant-tabs-nav-list {
      padding-right: 16px;
    }

    .ant-tabs-tab {
      font-size: 14px;
      padding: 8px 12px;
    }

    // .ant-tabs-content-holder {
    //   padding: 20px 35px;
    // }
  }

  @media (max-width: 480px) {
    .ant-tabs-top {
      gap: 16px;
    }

    .ant-tabs-nav-wrap {
      padding-right: 12px;
      margin-right: -12px;
    }

    .ant-tabs-nav-list {
      padding-right: 12px;
    }

    .ant-tabs-tab {
      font-size: 12px;
      padding: 6px 10px;
    }
  }
`;

export const LessonBody = styled.section`
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(37, 56, 115, 0.08);
  padding: 40px 73px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  p {
    margin: 0;
    line-height: 24px;
    font-weight: 400;
    font-size: 16px;
  }
`;

export const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ActivityCard = styled(Card)`
  border-radius: 20px;
  border: none;
  background: #f0f2f5;
  box-shadow: 0 16px 36px rgba(27, 44, 126, 0.08);

  .ant-card-body {
    padding: 20px 24px;
    // background: red;
  }

  .activity-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    // background: green;
  }

  .activity-details-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .activity-details {
    display: flex;
    gap: 20px;
  }

  .activity-detail {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .activity-detail-label {
    font-size: 14px;
    color: #6a6a6a;
  }

  .activity-detail-item {
    font-size: 14px;
    color: #2798cd;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;

  .slick-slide {
    width: fit-content !important;
  }

  .slick-slider {
    padding-bottom: 12px;
  }

  .slick-list {
    margin: 0 -12px;
  }

  .slick-dots li button {
    background: rgba(31, 59, 179, 0.25);
  }

  .slick-dots li.slick-active button {
    background: #1f3bb3;
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
  border-radius: 12px;
  text-align: center;
  border: none;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(183, 34, 87, 0.12);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 240px;

  .ant-card-body {
    padding: 24px 20px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
`;

export const ResourceIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 32px;
  color: #ff2d5f;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(183, 34, 87, 0.15);
  margin: 0 auto 20px;
  border: none;
`;

export const ResourceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 6px;
  margin-bottom: 12px;
  justify-content: flex-start;
`;

export const ResourceFileName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  word-break: break-word;
  line-height: 1.4;
`;

export const ResourceFileSize = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  text-align: center;
  line-height: 1.4;
`;

export const ResourceDownloadButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ff2d5f;
  background: #ffffff;
  color: #ff2d5f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #ff2d5f;
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(255, 45, 95, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SpinningWheelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 40px 0;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const SpinningWheelWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Style for wheel text to support horizontal wrapping */
  svg text {
    text-anchor: middle;
    dominant-baseline: middle;
    word-spacing: 0;
    letter-spacing: 0;
    white-space: pre-line;
  }

  /* Style for tspan elements (multi-line text) */
  svg tspan {
    text-anchor: middle;
    dominant-baseline: middle;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

export const WheelPointer = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1f3bb3;
  font-size: 24px;
`;

export const WheelCenterButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1f3bb3 0%, #4e6bff 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 8px 24px rgba(31, 59, 179, 0.4);
  z-index: 10;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

export const WheelCenterIcons = styled.div`
  position: absolute;
  top: calc(50% + 50px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
`;

export const WheelCenterIcon = styled.div<{ bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const SpinningWheelContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-width: 400px;

  .spinning-wheel-content-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h3 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.3;
  }

  p {
    margin: 0;
    line-height: 1.6;
    font-size: 16px;
  }
`;

export const SpinButton = styled.button`
  margin-top: 8px;
  padding: 14px 32px;
  background: #1d3c63;
  border: 9px;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
  width: fit-content;
  align-self: center;

  &:hover {
    background: #4e6bff;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const HiddenHeading = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const VideoThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 19px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: #000;

  video {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0.7;
    transition: opacity 0.3s;
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

export const VideoPlayerModal = styled.div`
  video {
    width: 100%;
    max-width: 100%;
    border-radius: 8px;
  }
`;
