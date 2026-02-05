import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  EyeOutlined,
  FilePdfOutlined,
  LeftOutlined,
  PlayCircleFilled,
  RightOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import {
  CarouselContainer,
  FileCard,
  SlideGrid
} from 'modules/ManageChapter/Modules/view/ViewChapter.styled';
import { ResourceItem } from 'modules/ManageChapter/Modules/view/types';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// import { Typography } from 'antd';
import { IMAGE_URL } from 'utils/constants';
import { formatFileSize } from 'utils/functions';

import CommonModal from 'components/common/Modal/components/CommonModal';
import { DownloadIcon, FileIcon, FileIconDoc, FileIconPPT, FileIconXLS } from 'components/svg';

import {
  GalleryFigure,
  GalleryImage,
  HoverPreviewOverlay,
  HoverPreviewText,
  MediaPreviewContainer,
  MediaPreviewContent,
  MediaPreviewImage,
  MediaPreviewNavButton,
  MediaPreviewVideo,
  PlayButtonOverlay,
  VideoPlayerModalContainer,
  VideoThumbnailContainer,
  VideoThumbnailOverlay
} from './CommonMedia.styled';
import { defaultCarouselSettings } from './carouselSettings';
import type { CommonMediaProps } from './types';

// const { Text } = Typography;

// -----------------------
// Helper to build file URL
// -----------------------

export default function CommonMedia<T = any>({
  mode,
  data = [],
  urlName = '',
  itemsPerSlide: initialItemsPerSlide = 4,
  carouselSettings,
  Carousel,
  Container,
  gallery,
  galleryCarouselSettings,
  resources
}: CommonMediaProps<T>) {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024; // Default for SSR
  });

  // Calculate responsive itemsPerSlide based on window width
  const itemsPerSlide = useMemo(() => {
    // Match CSS breakpoints for consistency
    console.log('🚀 ~ CommonMedia ~ windowWidth:', windowWidth);
    if (windowWidth > 1280) {
      return initialItemsPerSlide; // Large screens: 4 items (or provided value) - > 1280px
    } else if (windowWidth > 480) {
      return 2; // Small to medium screens: 2 items (480px - 1280px)
    } else {
      return 1; // Extra small screens (mobile): 1 item (<= 480px)
    }
  }, [windowWidth, initialItemsPerSlide]);
  console.log('🚀 ~ CommonMedia ~ itemsPerSlide:', itemsPerSlide);

  // Handle window resize and initial mount
  useEffect(() => {
    // Set initial width on mount (handles hydration mismatch)
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buildFileUrl = useCallback(
    (mediaUrl?: string) => (mediaUrl ? `${IMAGE_URL}scamper/${urlName}/${mediaUrl}` : ''),
    [urlName]
  );

  // -----------------------
  // Choose correct data
  // -----------------------
  const actualData = useMemo(() => {
    if (mode === 'gallery') return (gallery as T[]) || data;
    if (mode === 'resources') return (resources as T[]) || data;
    return data;
  }, [mode, data, gallery, resources]);

  // -----------------------
  // Collect all media items (images and videos) for preview
  // -----------------------
  const mediaItems = useMemo(() => {
    if (mode !== 'gallery') return [];
    return actualData
      .filter((item: any) => item.media_type === 1 || item.media_type === 2)
      .map((item: any) => ({
        url: buildFileUrl(item.media_url),
        type: item.media_type,
        id: item.id
      }))
      .filter((item: any) => item.url !== '');
  }, [mode, actualData, buildFileUrl]);

  const handleMediaClick = useCallback(
    (mediaUrl: string) => {
      const index = mediaItems.findIndex((item) => item.url === mediaUrl);
      if (index >= 0) {
        setCurrentMediaIndex(index);
        setIsPreviewModalOpen(true);
      }
    },
    [mediaItems]
  );

  const handlePreviewClose = useCallback(() => {
    setIsPreviewModalOpen(false);
  }, []);

  const handlePrevMedia = useCallback(() => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  }, [mediaItems.length]);

  const handleNextMedia = useCallback(() => {
    setCurrentMediaIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  }, [mediaItems.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isPreviewModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevMedia();
      } else if (e.key === 'ArrowRight') {
        handleNextMedia();
      } else if (e.key === 'Escape') {
        handlePreviewClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewModalOpen, handlePrevMedia, handleNextMedia, handlePreviewClose]);

  // -----------------------
  // Merge carousel settings
  // -----------------------
  const finalCarouselSettings = {
    ...defaultCarouselSettings,
    ...(carouselSettings || galleryCarouselSettings),
    // Ensure slidesToShow is always 1 - CSS handles responsive items per slide
    slidesToShow: 1,
    slidesToScroll: 1,
    // Remove any responsive settings that change slidesToShow
    responsive: []
  };

  // -----------------------
  // Split items into slides
  // -----------------------
  const slides = useMemo(() => {
    const result: T[][] = [];
    for (let i = 0; i < actualData.length; i += itemsPerSlide) {
      result.push(actualData.slice(i, i + itemsPerSlide));
    }
    return result;
  }, [actualData, itemsPerSlide]);
  console.log('🚀 ~ CommonMedia ~ slides:', slides);

  // -----------------------
  // Gallery renderer (image/video)
  // -----------------------
  const renderGalleryItem = useCallback(
    (item: any) => {
      const fileUrl = buildFileUrl(item.media_url);

      return (
        <div key={item.id} style={{ width: '100%', height: '218px', display: 'flex', minWidth: 0 }}>
          <GalleryFigure className="border-lg" role="figure">
            {item.media_type === 1 ? (
              <>
                <GalleryImage
                  src={fileUrl}
                  alt="visual"
                  preview={false}
                  onClick={() => handleMediaClick(fileUrl)}
                  style={{ width: '100%', height: '218px', display: 'block', cursor: 'pointer' }}
                />
                <HoverPreviewOverlay onClick={() => handleMediaClick(fileUrl)}>
                  <HoverPreviewText>
                    <EyeOutlined />
                    <span>Preview</span>
                  </HoverPreviewText>
                </HoverPreviewOverlay>
              </>
            ) : item.media_type === 2 ? (
              <VideoThumbnailContainer onClick={() => handleMediaClick(fileUrl)}>
                <video
                  src={fileUrl}
                  preload="metadata"
                  muted
                  style={{ width: '100%', height: '218px', objectFit: 'cover' }}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <VideoThumbnailOverlay>
                  <PlayButtonOverlay
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMediaClick(fileUrl);
                    }}
                  >
                    <PlayCircleFilled />
                  </PlayButtonOverlay>
                </VideoThumbnailOverlay>
              </VideoThumbnailContainer>
            ) : (
              <p>Unsupported media type</p>
            )}
          </GalleryFigure>
        </div>
      );
    },
    [handleMediaClick, buildFileUrl]
  );

  // -----------------------
  // -----------------------
  // Helper to get file type icon based on file extension
  // -----------------------
  const getFileTypeIcon = useCallback((fileName?: string) => {
    if (!fileName) return <FilePdfOutlined style={{ fontSize: '48px', color: '#ff2d5f' }} />;

    const lowerFileName = fileName.toLowerCase();

    if (lowerFileName.endsWith('.pdf')) {
      return <FileIcon />;
    } else if (lowerFileName.endsWith('.doc') || lowerFileName.endsWith('.docx')) {
      return <FileIconDoc />;
    } else if (lowerFileName.endsWith('.xls') || lowerFileName.endsWith('.xlsx')) {
      return <FileIconXLS />;
    } else if (lowerFileName.endsWith('.ppt') || lowerFileName.endsWith('.pptx')) {
      return <FileIconPPT />;
    }

    // Default to PDF
    return <FilePdfOutlined style={{ fontSize: '48px', color: '#ff2d5f' }} />;
  }, []);

  // -----------------------
  // Resource renderer (Downloadable documents)
  // -----------------------
  const renderResourceItem = useCallback(
    (item: ResourceItem) => {
      const fileUrl = buildFileUrl(item?.media_url);
      const fileIcon = getFileTypeIcon(item?.originalname);

      return (
        <div key={item.id} style={{ width: '100%', minWidth: 0, flexShrink: 0 }}>
          <FileCard>
            <div className="top" style={{ position: 'relative' }}>
              {fileIcon}
            </div>
            <div className="bottom">
              <div className="fileName">
                <Tooltip title={item?.originalname || '-'} placement="top">
                  <div className="name">{item?.originalname || '-'}</div>
                </Tooltip>
                <div className="size">{formatFileSize(item?.size)}</div>
              </div>
              <div className="icon" onClick={() => fileUrl && window.open(fileUrl, '_blank')}>
                <DownloadIcon />
              </div>
            </div>
          </FileCard>
        </div>
      );
    },
    [buildFileUrl, getFileTypeIcon]
  );

  // -----------------------
  // Final rendering logic
  // -----------------------
  const renderItem = useCallback(
    (item: T) => {
      if (mode === 'gallery') return renderGalleryItem(item);
      if (mode === 'resources') return renderResourceItem(item as ResourceItem);
      return <div key={String(item)}>{String(item)}</div>;
    },
    [mode, renderGalleryItem, renderResourceItem]
  );

  const CarouselComponent = Carousel;
  const ContainerComponent = Container || CarouselContainer;

  return (
    <>
      <section
        aria-label={mode === 'gallery' ? 'Images and videos gallery' : 'Downloadable content'}
      >
        <ContainerComponent>
          <CarouselComponent {...finalCarouselSettings}>
            {slides.map((slideItems, idx) => (
              <div key={idx}>
                <SlideGrid $itemsPerSlide={itemsPerSlide} $mode={mode}>
                  {slideItems?.map((item) => renderItem(item))}
                </SlideGrid>
              </div>
            ))}
          </CarouselComponent>
        </ContainerComponent>
      </section>

      <VideoPlayerModalContainer />
      <CommonModal
        open={isPreviewModalOpen}
        onCancel={handlePreviewClose}
        centered={true}
        closable={true}
        maskClosable={true}
        width="90%"
        style={{ maxWidth: '1000px' }}
        footer={null}
        className="media-preview-modal"
        bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column' }}
      >
        <MediaPreviewContainer>
          {mediaItems.length > 0 && mediaItems[currentMediaIndex] && (
            <>
              {mediaItems.length > 1 && (
                <>
                  <MediaPreviewNavButton
                    $position="left"
                    onClick={handlePrevMedia}
                    aria-label="Previous media"
                  >
                    <LeftOutlined />
                  </MediaPreviewNavButton>
                  <MediaPreviewNavButton
                    $position="right"
                    onClick={handleNextMedia}
                    aria-label="Next media"
                  >
                    <RightOutlined />
                  </MediaPreviewNavButton>
                </>
              )}
              <MediaPreviewContent>
                {mediaItems[currentMediaIndex].type === 1 ? (
                  <MediaPreviewImage src={mediaItems[currentMediaIndex].url} alt="Preview" />
                ) : (
                  <MediaPreviewVideo
                    src={mediaItems[currentMediaIndex].url}
                    controls
                    autoPlay
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
              </MediaPreviewContent>
              {mediaItems.length > 1 && (
                <div
                  style={{
                    textAlign: 'center',
                    paddingTop: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    flexShrink: 0
                  }}
                >
                  {currentMediaIndex + 1} / {mediaItems.length}
                </div>
              )}
            </>
          )}
        </MediaPreviewContainer>
      </CommonModal>
    </>
  );
}
