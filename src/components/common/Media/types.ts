import type { CarouselProps } from 'antd';

export interface ResourceItem {
  id: number;
  parent_type: string;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  originalname?: string;
  size?: number;
  is_downloadable_content: boolean;
}

export interface GalleryItem {
  id: string | number;
  imageSrc: string;
  title?: string;
}

export interface CommonMediaProps<T = any> {
  mode: 'gallery' | 'resources';
  // Generic data array
  data?: T[];
  urlName?: string;
  // Number of items to show per slide
  itemsPerSlide?: number;
  // Carousel settings
  carouselSettings?: CarouselProps;
  // Render function for each item
  renderItem?: (item: T, index: number) => React.ReactNode;
  // Callback for resource download (for resources mode)
  // Carousel component
  Carousel: React.ComponentType<any>;
  // Optional custom container component
  Container?: React.ComponentType<{ children: React.ReactNode }>;
  // Legacy props for backward compatibility
  gallery?: GalleryItem[];
  galleryCarouselSettings?: CarouselProps;
  resources?: ResourceItem[];
}

export interface IMedia {
  id: number;
  parent_type: string;
  parent_id: number;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
  size: number;
  originalname: string;
}

export interface IDownloadableContentItem {
  id: number;
  parent_type: string;
  parent_id: number;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
  size: number;
  originalname: string;
}
