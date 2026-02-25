import {
  IGetChapterByIdRes,
  IGetChapterByIdResDownloadableContent,
  IGetChapterByIdResLesson,
  IGetChapterByIdResMedum,
  IRubricItem
} from 'services/chapter/types';

export type DetailTabKey = 'overview' | 'assigned';

export type ContentTabKey = 'lessons' | 'gallery' | 'resources' | 'rubrics';

export interface GalleryItem {
  id: number;
  parent_type: string;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
}

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

export interface RubricRow {
  id: number;
  chapter_id: number;
  parameter: string;
  max_score: number;
  exemplary: string;
  effective: string;
  acceptable: string;
  developing: string;
  incomplete: string;
}

export interface AssignedStudent {
  id: string;
  name: string;
  progress: string;
}

export interface OverviewStatistic {
  id: string;
  label: string;
  value: string;
  helper: string;
}

export interface OverviewData {
  tag: string;
  title: string;
  subtitle: string;
  description: string[];
  imageSrc: string;
  statistics: OverviewStatistic[];
}

export interface OverviewSectionProps {
  overview: IGetChapterByIdRes | undefined;
}

export interface AssignedStudentData {
  id: string;
  student_id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'Complete' | 'Pending';
  updated_at: string;
}

export interface ContentTabsSectionProps {
  activeTab: ContentTabKey;
  onTabChange: (tab: ContentTabKey) => void;
  lessons: IGetChapterByIdResLesson[];
  gallery: IGetChapterByIdResMedum[];
  resources: IGetChapterByIdResDownloadableContent[];
  rubrics: IRubricItem[];
}
