import { useEffect, useMemo, useRef, useState } from 'react';

import { PlayCircleFilled } from '@ant-design/icons';
import { Carousel, Image } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { ViewMedum } from 'services/faq/types';

import {
  CarouselItem,
  CarouselWrapper,
  PlayButtonOverlay,
  VideoThumbnailContainer,
  VideoThumbnailOverlay
} from './MediaCarousel.styled';

interface IMediaCarouselProps {
  media: ViewMedum[];
  onVideoClick: (videoUrl: string) => void;
  buildMediaUrl: (fileName: string) => string;
}

export const MediaCarousel: React.FC<IMediaCarouselProps> = ({
  media,
  onVideoClick,
  buildMediaUrl
}) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Calculate items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setItemsPerSlide(1);
      } else if (width <= 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Group media items into slides based on itemsPerSlide
  const slides = useMemo(() => {
    const groupedSlides: ViewMedum[][] = [];
    for (let i = 0; i < media.length; i += itemsPerSlide) {
      groupedSlides.push(media?.slice(i, i + itemsPerSlide));
    }
    return groupedSlides;
  }, [media, itemsPerSlide]);

  const totalSlides = slides.length;

  // Reset to first slide when itemsPerSlide changes
  useEffect(() => {
    setCurrentSlide(0);
    carouselRef.current?.goTo(0);
  }, [itemsPerSlide]);

  return (
    <div style={{ width: '100%' }}>
      <CarouselWrapper>
        <Carousel
          ref={carouselRef}
          dots={false}
          arrows={totalSlides > 1}
          infinite={false}
          slidesToShow={1}
          slidesToScroll={1}
          beforeChange={(_from, to) => {
            setCurrentSlide(to);
          }}
          afterChange={(current) => {
            setCurrentSlide(current);
          }}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]}
        >
          {slides?.map((slideItems, slideIndex) => (
            <div key={slideIndex}>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '0 8px',
                  justifyContent: 'flex-start'
                }}
              >
                {slideItems?.map((item, itemIndex) => {
                  const mediaUrl = buildMediaUrl(item?.media_url);
                  const isVideo = item.media_type === 2;

                  // Calculate width based on itemsPerSlide
                  const gap = 16;
                  const gaps = itemsPerSlide > 1 ? (itemsPerSlide - 1) * gap : 0;
                  const itemWidth = `calc((100% - ${gaps}px) / ${itemsPerSlide})`;

                  return (
                    <CarouselItem key={`${item?.media_url}-${itemIndex}`} $itemWidth={itemWidth}>
                      {isVideo ? (
                        <VideoThumbnailContainer onClick={() => onVideoClick(mediaUrl)}>
                          <video
                            src={mediaUrl}
                            preload="metadata"
                            muted
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <VideoThumbnailOverlay>
                            <PlayButtonOverlay
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onVideoClick(mediaUrl);
                              }}
                            >
                              <PlayCircleFilled />
                            </PlayButtonOverlay>
                          </VideoThumbnailOverlay>
                        </VideoThumbnailContainer>
                      ) : (
                        <Image
                          src={mediaUrl}
                          alt={`Media ${slideIndex * itemsPerSlide + itemIndex + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                          preview
                        />
                      )}
                    </CarouselItem>
                  );
                })}
              </div>
            </div>
          ))}
        </Carousel>
      </CarouselWrapper>

      {totalSlides > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 16
          }}
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              onClick={() => carouselRef.current?.goTo(index)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? '#1890ff' : '#d9d9d9',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
