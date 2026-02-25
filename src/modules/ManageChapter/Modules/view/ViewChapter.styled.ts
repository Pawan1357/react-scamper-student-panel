import { Card } from 'antd';

import styled from 'styled-components';

export const ContentSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const OverviewCard = styled(Card)`
  border-radius: 20px;

  .ant-card-body {
    padding: 40px 73px;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 24px;
    }
  }
`;

export const DetailTabsWrapper = styled.div`
  .ant-tabs-nav {
    margin: 0 0 20px 24px;
    padding: 0;
  }

  .ant-tabs-nav-wrap {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(39, 152, 205, 0.3) transparent;
    padding-right: 20px;
    margin-right: -20px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(39, 152, 205, 0.3);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(39, 152, 205, 0.5);
    }
  }

  .ant-tabs-nav-list {
    flex-wrap: nowrap;
    min-width: max-content;
    padding-right: 20px;
  }

  .ant-tabs-content-holder {
    padding: 0;
  }

  .ant-tabs-content {
    margin-top: 0;
  }

  .ant-tabs-tab {
    font-weight: 500;
    font-size: 16px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #2798cd;
  }

  .ant-tabs-ink-bar {
    background: #2798cd;
  }

  @media (max-width: 768px) {
    .ant-tabs-nav {
      margin: 0 0 16px 16px;
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
    .ant-tabs-nav {
      margin: 0 0 12px 12px;
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

export const OverviewTabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ContentTabsCard = styled(Card)`
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(37, 56, 115, 0.08);

  .ant-card-body {
    padding: 0;
  }

  .ant-tabs-nav {
    margin: 0;
    padding: 40px 73px;
  }

  .ant-tabs-nav-wrap {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(39, 152, 205, 0.3) transparent;
    padding-right: 20px;
    margin-right: -20px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(39, 152, 205, 0.3);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(39, 152, 205, 0.5);
    }
  }

  .ant-tabs-nav-list {
    flex-wrap: nowrap;
    min-width: max-content;
    padding-right: 20px;
  }

  .ant-tabs-content-holder {
    padding: 0px 73px 40px 73px;
  }

  .ant-tabs-tab {
    font-weight: 600;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #2798cd;
  }

  .ant-tabs-ink-bar {
    background: #2798cd;
  }

  @media (max-width: 768px) {
    .ant-tabs-nav {
      padding: 20px 35px;
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

    .ant-tabs-content-holder {
      padding: 0px 35px 20px 35px;
    }
  }

  @media (max-width: 480px) {
    .ant-tabs-nav {
      padding: 16px 20px;
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

    .ant-tabs-content-holder {
      padding: 0px 20px 16px 20px;
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  h3 {
    margin: 0;
    color: #0f1b53;
  }
`;

export const CardLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6d7bad;
`;

export const SegmentedWrapper = styled.div`
  .ant-segmented {
    background: #e5ebff;
    border-radius: 999px;
    padding: 4px;
  }

  .ant-segmented-item {
    font-weight: 600;
    color: #4b5c9d;
  }

  .ant-segmented-item-selected {
    background: linear-gradient(135deg, #1f3bb3 0%, #4e6bff 100%);
    color: #ffffff;
    box-shadow: 0 6px 18px rgba(35, 71, 195, 0.35);
  }
`;

export const OverviewBody = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;

  p {
    margin: 0;
    color: #01132a;
    line-height: 24px;
  }
`;

export const ThumbnailPanel = styled.div`
  border-radius: 20px;
  overflow: hidden;

  .ant-image,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StatisticsPanel = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  padding: 22px 24px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(32, 74, 225, 0.12), rgba(112, 163, 255, 0.08));
  border: 1px solid rgba(32, 74, 225, 0.2);
`;

export const StatisticCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #102044;

  .stat-label {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #5163a3;
  }

  h3 {
    margin: 0;
  }
`;

export const LessonsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const LessonCard = styled(Card)`
  border-radius: 20px;
  border: none;
  background: #f0f2f5;
  box-shadow: 0 16px 36px rgba(27, 44, 126, 0.08);

  .ant-card-body {
    padding: 20px 24px;
  }

  .lesson-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
  }

  h5 {
    font-size: 20px;
    margin: 0;
    color: #0f1b53;
  }

  .test {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export const LessonIcon = styled.span<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: ${(props) => props.$accent};
  box-shadow: 0 12px 24px rgba(34, 51, 135, 0.22);

  svg {
    color: #ffffff;
    font-size: 22px;
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

export const MediaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(31, 59, 179, 0.08);
  color: #1f3bb3;

  svg {
    font-size: 14px;
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

export const ResourceCard = styled(Card)`
  border-radius: 18px;
  text-align: center;
  border: none;
  padding: 4px;
  // background: linear-gradient(180deg, rgba(255, 244, 248, 0.95) 0%, #ffffff 40%);
  // box-shadow: 0 16px 30px rgba(183, 34, 87, 0.1);

  .ant-card-body {
    padding: 24px 12px;
  }

  button {
    border-color: #d61f5b;
    color: #d61f5b;
  }

  button:hover,
  button:focus {
    color: #ffffff;
    border-color: #d61f5b;
    background: #d61f5b;
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
`;

export const RubricTableWrapper = styled.section`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 820px;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
  }

  th,
  td {
    padding: 18px 16px;
    text-align: center;
    border: 1px solid rgba(41, 57, 128, 0.08);
    vertical-align: top;
  }

  thead th {
    font-weight: 700;
    color: #0f1b53;
  }

  thead th:nth-child(1) {
    background: #fcb21d;
    color: #ffffff;
  }

  thead th:nth-child(2) {
    background: #a0d867;
    color: #ffffff;
  }

  thead th:nth-child(3) {
    background: #87b8dc;
    color: #ffffff;
  }

  thead th:nth-child(4) {
    background: #9a5fda;
    color: #ffffff;
  }

  thead th:nth-child(5) {
    background: #e61e9a;
    color: #ffffff;
  }

  thead th:nth-child(6) {
    background: #1d3c63;
    color: #ffffff;
  }

  tbody th {
    background: rgba(31, 59, 179, 0.08);
    font-weight: 600;
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

export const FinalRubricsSummary = styled.section`
  margin-bottom: 32px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #0f1b53;
    margin: 0 0 20px 0;
  }
`;

export const FinalRubricsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #f5f5f5;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  thead {
    background: #f2f2f2;
  }

  th {
    padding: 10px 16px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #0f1b53;
    border: none;
  }

  th:first-child {
    border-top-left-radius: 20px;
  }

  th:last-child {
    border-top-right-radius: 20px;
  }

  tbody {
    background: #ffffff;
  }

  td {
    padding: 10px 16px;
    text-align: center;
    font-size: 14px;
    color: #0f1b53;
    border: none;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 20px;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 20px;
  }
`;

export const FinalRubricBadge = styled.span<{ $level: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: #ffffff;
  min-width: 120px;

  ${(props) => {
    switch (props.$level.toLowerCase()) {
      case 'exemplary':
        return 'background: #a0d867;';
      case 'effective':
        return 'background: #87b8dc;';
      case 'acceptable':
        return 'background: #9a5fda;';
      case 'developing':
        return 'background: #e61e9a;';
      case 'incomplete':
        return 'background: #1d3c63;';
      default:
        return 'background: #87b8dc;';
    }
  }}
`;

export const FinalRubricTotal = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #0f1b53;
`;

export const AssignedBody = styled.section`
  padding: 12px 0;
`;

export const AssignedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AssignedItem = styled.div`
  padding: 18px 24px;
  border-radius: 14px;
  background: rgba(243, 246, 255, 0.7);
  border: 1px solid rgba(31, 59, 179, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AssignedStudentsTableWrapper = styled(Card)`
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(37, 56, 115, 0.08);

  .ant-card-body {
    padding: 40px 73px;
  }

  .ant-table {
    background: #ffffff;
  }

  .ant-table-thead > tr > th {
    background: #f8faff;
    font-weight: 600;
    color: #0f1b53;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 24px;
    }
  }
`;
