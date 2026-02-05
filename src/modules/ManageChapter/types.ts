import { FormInstance } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { IQuestion } from 'services/chapter/types';

export interface IMediaItem {
  fileName: string;
  media_type: number;
  size?: number;
  originalname?: string;
}

export interface IDownloadableContentItem {
  fileName: string;
  type: number;
  is_downloadable: boolean;
  size?: number;
  originalname?: string;
}

export interface IChapterFormProps {
  thumbnailFileList?: UploadFile[];
  handleThumbnailUpload?: (file: File) => void;
  handleThumbnailRemove?: () => void;
  form: any;
  thumbnailImageError?: string;
  isUploadPending?: boolean;
  thumbnailLoader: boolean;
  chapterId?: string;
}

export interface ISpinningWheelRow {
  id: number;
  section: number;
  points: number;
  title: string;
  description: string;
  hasMedia: boolean;
  media_url: string;
}

export interface IActivityStepProps {
  chapterId: string;
  activityMedia?: IMediaItem[];
  activityMediaLoader?: boolean;
  isUploadPending: boolean;
  activityMediaFileList?: UploadFile[];
  activityMediaErrorMessage?: string;
  onActivityMediaUpload?: (files: File[]) => void;
  onActivityMediaRemove?: (file: UploadFile) => void;

  setActivityMedia?: (media: IMediaItem[]) => void;
  clearActivityMedia?: () => void;

  questionMediaLoader?: boolean;
  questionMediaFileList?: UploadFile[];
  questionMediaErrorMessage?: string;
  onQuestionMediaUpload?: (files: File[]) => void;
  onQuestionMediaRemove?: (file: UploadFile) => void;
  setQuestionMedia?: (media: IMediaItem[]) => void;
  clearQuestionMedia?: () => void;
}

export interface IActivityFormProps {
  form: FormInstance<any>;
  selectedActivityId: string;
  activityName: string;
  setRenderActivityForm: (render: boolean) => void;
  onCancel?: () => void;
  isSaving?: boolean; // Loading state for inner button
  isSavingOuter?: boolean; // Loading state for outer button (used to disable inner button)

  activityMediaLoader?: boolean;
  isUploadPending: boolean;
  activityMediaFileList?: UploadFile[];
  activityMediaErrorMessage?: string;
  onActivityMediaUpload?: (files: File[]) => void;
  onActivityMediaRemove?: (file: UploadFile) => void;

  setActivityMedia?: (media: IMediaItem[]) => void;
  clearActivityMedia?: () => void;
  onActivityTypeChange?: (newType: string) => void;
  isCreateFlow?: boolean;
}

export enum QuestionType {
  MCQ = 'mcq',
  MATCH_PAIR = 'match_pair',
  DRAG_AND_DROP = 'drag_and_drop'
}

export interface IQuestionListProps {
  form: FormInstance<any>;
  questionMediaLoader?: boolean;
  isUploadPending: boolean;
  questionMediaFileList?: UploadFile[];
  questionMediaErrorMessage?: string;
  onQuestionMediaUpload?: (files: File[]) => void;
  onQuestionMediaRemove?: (file: UploadFile) => void;
  setQuestionMedia?: (media: IMediaItem[]) => void;
  clearQuestionMedia?: () => void;
  questionsForms: IQuestion[];
  activityType?: 'mcq' | 'match_pair' | 'drag_and_drop';
  onQuestionUpdate?: (question: IQuestion) => void;
  onQuestionDelete?: (id: string) => void;
  savedQuestionsCount?: number;
  isQuestionSaved?: (questionId: number) => boolean;
  newlyAddedQuestionId?: number;
}

export interface IQuestionItemProps {
  form: FormInstance<any>;
  questionMediaLoader?: boolean;
  isUploadPending: boolean;
  questionMediaFileList?: UploadFile[];
  questionMediaErrorMessage?: string;
  onQuestionMediaUpload?: (files: File[]) => void;
  onQuestionMediaRemove?: (file: UploadFile) => void;
  setQuestionMedia?: (media: IMediaItem[]) => void;
  clearQuestionMedia?: () => void;
  question?: IQuestion;
  activityType?: 'mcq' | 'match_pair' | 'drag_and_drop';
  onQuestionUpdate?: (question: IQuestion) => void;
  uploadingRowId?: string | null;
  setUploadingRowId?: (rowId: string | null) => void;
}
