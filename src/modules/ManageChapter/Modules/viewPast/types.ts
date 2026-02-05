import {
  IGetChapterByIdRes,
  IGetChapterByIdResLesson,
  IGetChapterByIdResMedum
} from 'services/chapter/types';

export type ContentTabKey = 'lessons' | 'gallery' | 'resources';

// Re-export types from view module
export type { GalleryItem, ResourceItem, RubricRow, OverviewSectionProps } from '../view/types';

export interface ContentTabsSectionProps {
  activeTab: ContentTabKey;
  onTabChange: (tab: ContentTabKey) => void;
  lessons: IGetChapterByIdResLesson[];
  gallery: IGetChapterByIdResMedum[];
  resources: IGetChapterByIdRes['downloadable_content'];
  rubrics: IGetChapterByIdRes['rubrics'];
}
