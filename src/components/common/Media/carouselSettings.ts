import type { CarouselProps } from 'antd';

/**
 * Default carousel settings for displaying multiple items per slide
 * Shows 1 slide at a time, with items grouped within each slide
 * CSS handles responsive behavior by controlling items per slide
 */
export const defaultCarouselSettings: CarouselProps = {
  dots: false,
  arrows: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: []
};

/**
 * Carousel settings for legacy single-item-per-slide display
 * (kept for backward compatibility)
 */
export const legacyCarouselSettings: CarouselProps = {
  dots: true,
  arrows: true,
  infinite: false,
  slidesToShow: 3,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } }
  ]
};
