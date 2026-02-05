import { useState } from 'react';

import type { TabsProps } from 'antd';
import { Button, Carousel, Empty, Image, Tabs, Typography } from 'antd';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

import { SpinConfig } from 'services/chapter/types';

import { CurriculumItemCard } from 'components/common/CurriculumItemCard';
import CommonModal from 'components/common/Modal/components/CommonModal';
import CommonMedia from 'modules/ManageChapter/components/Media/CommonMedia';
import { defaultCarouselSettings } from 'modules/ManageChapter/components/Media/carouselSettings';
import styled from 'styled-components';

import { ContentTabsCard, HiddenHeading } from '../Lesson.styled';
import type { ContentTabsSectionProps } from '../types';

const ModalImageContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;

  .ant-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .ant-image-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
    }
  }
`;

// const SpinWheel: React.FC<{
//   parts: IGetLessonByIdRes['spin_configs'];
//   onSpin: () => void;
//   onStopSpinning: (prizeNumber: number) => void;
// }> = ({ parts, onSpin, onStopSpinning }) => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);

//   const handleSpinClick = () => {
//     if (mustSpin) return;
//     const newPrizeNumber = Math.floor(Math.random() * parts.length);
//     setPrizeNumber(newPrizeNumber);
//     setMustSpin(true);
//     onSpin();
//   };

//   const wheelData = useMemo(() => {
//     return parts?.map((item) => ({
//       option: item?.title
//     }));
//   }, [parts]);

//   const backgroundColors = [
//     '#9c27b0',
//     '#e91e63',
//     '#ff9800',
//     '#ffb74d',
//     '#ffeb3b',
//     '#8bc34a',
//     '#4caf50',
//     '#03a9f4'
//   ];

//   return (
//     <SpinningWheelContainer>
//       <SpinningWheelWrapper>
//         <Wheel
//           mustStartSpinning={mustSpin}
//           prizeNumber={prizeNumber}
//           data={wheelData}
//           backgroundColors={backgroundColors}
//           textColors={['#fff']}
//           outerBorderColor="#ccc"
//           outerBorderWidth={3}
//           radiusLineColor="#ddd"
//           radiusLineWidth={2}
//           fontSize={14}
//           onStopSpinning={() => {
//             setMustSpin(false);
//             onStopSpinning(prizeNumber);
//           }}
//         />
//         <WheelCenterButton onClick={handleSpinClick} disabled={mustSpin}>
//           <PlayCircleOutlined style={{ fontSize: '32px' }} />
//         </WheelCenterButton>
//       </SpinningWheelWrapper>
//       <SpinningWheelContent>
//         <div className="spinning-wheel-content-text">
//           <h3>Try Your Luck and Spin the Wheel!</h3>
//           <p>Take a spin and see how many points you can earn! Good luck!</p>
//         </div>
//         <SpinButton onClick={handleSpinClick} disabled={mustSpin}>
//           Spin
//         </SpinButton>
//       </SpinningWheelContent>
//     </SpinningWheelContainer>
//   );
// };

export const ContentTabsSection: React.FC<ContentTabsSectionProps> = ({
  activeTab,
  detailTab,
  onTabChange,
  activities,
  gallery,
  resources,
  // showSpinningWheel = true,
  mediaUrlName,
  module = 'chapter',
  showStatusBadge = false,
  isPastContext = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winningResult, setWinningResult] = useState<SpinConfig | null>(null);

  const handleTabChange: TabsProps['onChange'] = (key) => {
    if (
      key === 'activities' ||
      key === 'imagesVideos' ||
      key === 'downloadableContent' ||
      key === 'spinningWheel'
    ) {
      onTabChange(key);
    }
  };

  // const handleStopSpinning = (prizeNumber: number) => {
  //   const winningPart = spinningWheelParts?.[prizeNumber];
  //   if (winningPart) {
  //     setWinningResult(winningPart);
  //     setIsModalOpen(true);
  //   }
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setWinningResult(null);
  };

  const getImageUrl = (mediaUrl: string) => {
    const urlName =
      mediaUrlName ||
      (module === 'teacherLearning' ? ImageTypeEnum.TL_LESSON : ImageTypeEnum.LESSON);
    return `${IMAGE_URL}scamper/${urlName}/${mediaUrl}`;
  };

  const getMediaUrlName = () => {
    if (mediaUrlName) return mediaUrlName;
    if (detailTab === 'teacherGuidelines') return ImageTypeEnum.TEACHER_GUIDELINE;
    return module === 'teacherLearning' ? ImageTypeEnum.TL_LESSON : ImageTypeEnum.LESSON;
  };

  // const renderSpinningWheel = () => {
  //   return (
  //     <section aria-label="Spinning wheel">
  //       <SpinWheel
  //         parts={spinningWheelParts || []}
  //         onSpin={() => {}}
  //         onStopSpinning={handleStopSpinning}
  //       />
  //     </section>
  //   );
  // };

  const tabItems: TabsProps['items'] = [
    ...(detailTab == 'overview'
      ? [
          {
            key: 'activities',
            label: 'Activities',
            children: (
              <section aria-label="Activities list">
                <CurriculumItemCard
                  isActivity
                  listData={activities}
                  btnText={'Go to Skill Check'}
                  module={module}
                  showStatusBadge={showStatusBadge}
                  isPastContext={isPastContext}
                />
              </section>
            )
          }
        ]
      : []),
    {
      key: 'imagesVideos',
      label: 'Images and Videos',
      children:
        gallery.length > 0 ? (
          <CommonMedia
            mode="gallery"
            urlName={getMediaUrlName()}
            Carousel={Carousel}
            data={gallery}
            itemsPerSlide={4}
            carouselSettings={defaultCarouselSettings}
          />
        ) : (
          <Empty description="No media available" />
        )
    },
    {
      key: 'downloadableContent',
      label: 'Downloadable Content',
      children:
        resources?.filter((val) => val?.is_downloadable)?.length > 0 ? (
          <CommonMedia
            mode="resources"
            urlName={getMediaUrlName()}
            Carousel={Carousel}
            data={resources?.filter((val) => val?.is_downloadable) || []}
            itemsPerSlide={4}
            carouselSettings={defaultCarouselSettings}
          />
        ) : (
          <Empty description="No downloadable content available" />
        )
    }
    // ...(detailTab == 'overview' && showSpinningWheel && spinningWheelParts
    //   ? [
    //       {
    //         key: 'spinningWheel',
    //         label: 'Spinning Wheel',
    //         children:
    //           spinningWheelParts?.length > 0 ? (
    //             renderSpinningWheel()
    //           ) : (
    //             <Empty description="No spinning wheel content available" />
    //           )
    //       }
    //     ]
    //   : [])
  ];

  return (
    <>
      <ContentTabsCard bordered={false}>
        <HiddenHeading id="lesson-content-tabs">Lesson content tabs</HiddenHeading>
        <Tabs
          animated
          aria-labelledby="lesson-content-tabs"
          activeKey={activeTab}
          items={tabItems}
          onChange={handleTabChange}
        />
      </ContentTabsCard>

      <CommonModal
        open={isModalOpen}
        onCancel={handleModalClose}
        centered={true}
        closable={true}
        maskClosable={true}
        width={500}
        className="success-modal"
        footer={
          <>
            <Button type="primary" onClick={handleModalClose} className="cta-btn ok-btn">
              Spin Again
            </Button>
            <Button type="primary" onClick={handleModalClose} className="cta-btn ok-btn">
              Go Back
            </Button>
          </>
        }
      >
        <div className="modal-body-wrap">
          {winningResult?.media_url && <div className="title">General Knowledge Image</div>}
          {winningResult?.media_url && (
            <ModalImageContainer>
              <Image src={getImageUrl(winningResult?.media_url)} alt="Spinning wheel result" />
            </ModalImageContainer>
          )}
          {winningResult?.title && (
            <Typography.Title className="modal-title" level={4}>
              {winningResult.title}
            </Typography.Title>
          )}
          {winningResult?.points !== undefined && (
            <Typography.Text
              className="modal-question"
              style={{ display: 'block', marginTop: '12px', textAlign: 'start' }}
            >
              Points Earned: <strong>{winningResult.points}</strong>
            </Typography.Text>
          )}
          {winningResult?.description && (
            <Typography.Text className="modal-desc" style={{ display: 'block', marginTop: '16px' }}>
              <p
                className="tiptap-content-view"
                dangerouslySetInnerHTML={{ __html: winningResult?.description || '' }}
              />
            </Typography.Text>
          )}
        </div>
      </CommonModal>
    </>
  );
};
