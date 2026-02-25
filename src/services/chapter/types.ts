export interface IChapterBase {
  id: number;
  name: string;
  link: string;
  description: string;
  thumbnail: string;
  lesson_count: number;
  activity_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  created_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  media: any[];
}

export interface IGetChaptersListRes {
  chapters_list: IChapterBase[];
  total_records: number;
}

export interface ILessonBase {
  id: number;
  name: string;
  description: string;
  sequence: number;
  is_active: boolean;
  created_at: string;
  activities_count: string;
}

export interface IActivityBase {
  id: number;
  lesson_id: number;
  name: string;
  description: string;
  sequence: number;
  type: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface IMediaItem {
  name: string;
  media_type: number;
  size?: number;
  originalname?: string;
}

export interface IDownloadableContent {
  name: string;
  type: number;
  is_downloadable: boolean;
  size?: number;
  originalname?: string;
}

export interface IRubricItem {
  parameter: string;
  exemplary: string;
  effective: string;
  acceptable: string;
  developing: string;
  incomplete: string;
  max_score: number;
}

export interface IGetChapterByIdReq {
  id: string;
}

export interface IListChaptersReq {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export type IListChaptersRes = IListResponse<IChapterBase>;

// Lesson
export interface ISpinConfig {
  section_number: number;
  points: number;
  title: string;
  description: string;
  media_url: string;
}

export interface ITeacherGuidelineItemReq {
  title: string;
  description: string;
  media: IMediaItem[];
  downloadable_content: IDownloadableContent[];
}

export interface ITeacherGuidelineItemRes {
  title: string;
  description: string;
  media: {
    id: number;
    parent_type: string;
    media_url: string;
    media_type: number;
    thumbnail: string | null;
    is_downloadable: boolean;
    is_downloadable_content: boolean;
  }[];
  downloadable_content: {
    id: number;
    parent_type: string;
    media_url: string;
    media_type: number;
    thumbnail: string | null;
    is_downloadable: boolean;
    is_downloadable_content: boolean;
  }[];
}

export interface IGetLessonsListRes {
  id: number;
  name: string;
  description: string;
  sequence: number;
  is_active: boolean;
  created_at: string;
}

export interface IGetLessonByIdRes {
  id: number;
  chapter_id: number;
  name: string;
  description: string;
  sequence: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  is_locked: boolean;
  activities: any[];
  spin_configs: SpinConfig[];
  media: Medum[];
  downloadable_content: DownloadableContent[];
  teacher_guidelines: TeacherGuidelines;
}

export interface SpinConfig {
  id: number;
  lesson_id: number;
  section_number: number;
  points: number;
  title: string;
  description: string;
  media_url: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Medum {
  id: number;
  parent_type: string;
  parent_id: number;
  media_url: string;
  media_type: number;
  thumbnail: any;
  size?: number;
  originalname?: string;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
}

export interface DownloadableContent {
  id: number;
  parent_type: string;
  parent_id: number;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
  originalname?: string;
  size?: number;
}

export interface TeacherGuidelines {
  id: number;
  lesson_id: number;
  title: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  media: Medum2[];
  downloadable_content: DownloadableContent2[];
}

export interface Medum2 {
  id: number;
  parent_type: string;
  parent_id: number;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
  originalname?: string;
  size?: number;
}

export interface DownloadableContent2 {
  id: number;
  parent_type: string;
  parent_id: number;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
  originalname?: string;
  size?: number;
}

export type IListLessonsRes = IListResponse<ILessonBase>;

export interface MediaItem {
  name: string;
  media_type: number;
  size: number;
  originalname: string;
}

export interface IQuestion {
  id?: number;
  title: string;
  description: string;
  sequence: number;
  no_of_rows: number;
  no_of_columns: number;
  fictitious_wallet_points: string;
  wallet_value?: number;
  mcq_options?: McqOption[];
  match_pair_options?: MatchPairOption[];
  drag_drop_bases?: DragDropBase[];
  drag_drop_options?: DragDropOption[];
  media?: MediaItem[];
}

export interface QuestionItem {
  id: number;
  title: string;
  description: string;
  media: MediaItem[];

  mcq_options?: McqOption[];
  match_pair_options?: MatchPairOption[];

  no_of_rows?: number;
  no_of_columns?: number;
  fictitious_wallet_points?: string;
  wallet_value?: number;

  drag_drop_bases?: DragDropBase[];
  drag_drop_options?: DragDropOption[];
}

export interface McqOption {
  id?: number;
  option_text: string;
  option_image?: string;
  is_correct: boolean;
  total_points: number;
  sequence: number;
}

export interface MatchPairOption {
  id?: number;
  left_text?: string;
  left_image?: string;
  right_text?: string;
  right_image?: string;
  total_points: number;
  sequence: number;
}

export interface DragDropBase {
  id?: number;
  position: string;
  base_text?: string;
  base_image?: string;
  sequence: number;
}

export interface DragDropOption {
  id?: number;
  option_text?: string;
  option_image?: string;
  total_points: number;
  correct_positions: DragDropCorrectPosition[];
  sequence: number;
}

export interface DragDropCorrectPosition {
  position: string;
}

export interface StudentProgress {
  id: number;
  student_id: number;
  activity_id: number;
  status: 'completed' | 'pending' | 'in_progress' | string;
  current_question_sequence: number;
  correct_answers: number;
  total_questions: number;
  final_score: number;
  total_possible_score: number;
  started_at: string | null;
  completed_at: string | null;
  last_accessed_at: string | null;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface McqOptionAnswer {
  option_id: number;
  option_text: string;
  option_image: string | null;
}

export interface SubmitMcqAnswerRes {
  is_correct: boolean;
  points_earned: number;
  correct_answer: McqOptionAnswer;
  selected_answer: McqOptionAnswer;
  student_progress?: StudentProgress;
}

export interface MatchPairAnswer {
  left_option_id: number;
  right_option_id: number;
  is_correct: boolean;
  points_earned: number;
}

export interface SubmitMatchPairAnswerRes {
  total_points_earned: number;
  answers: MatchPairAnswer[];
  student_progress?: StudentProgress;
}

export interface DragDropAnswer {
  drag_drop_option_id: number;
  position: string;
}

export interface SubmitDragDropAnswerRes {
  total_points_earned: number;
  answers: Array<{
    drag_drop_option_id: number;
    position: string;
    is_correct: boolean;
    points_earned: number;
  }>;
  student_progress?: StudentProgress;
  fictitious_wallet_points_used?: number;
  remaining_fictitious_wallet_balance?: number;
  initial_fictitious_wallet_balance?: number;
}

export interface SpinWheelRes {
  points_earned?: number;
  message?: string;
  [key: string]: any;
}

export interface SpinConfig {
  id: number;
  lesson_id: number;
  section_number: number;
  points: number;
  title: string;
  description: string;
  media_url: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface IGetActivityByIdRes {
  id: number;
  lesson_id: number;
  name: string;
  description: string;
  sequence: number;
  type: string;
  chapter_name?: string;
  status?: string;
  lesson_name?: string;
  is_active: boolean;
  is_deleted: boolean;
  spin_config: SpinConfig[] | null;
  created_at: string;
  updated_at: string;
  media: Medum[];
  student_progress?: StudentProgress | null;
  questions: Question[];
}

export interface QueAnswer {
  selected_option_id: number;
  selected_option: SelectedOption;
  is_correct: boolean;
  points_earned: number;
  answered_at: string;
}

export interface SelectedOption {
  id: number;
  option_text: string;
  option_image: any;
}

export interface Question {
  id: number;
  activity_id: number;
  title: string;
  description: string;
  sequence: number;
  answers?: QueAnswer[];
  correct_pairs?: any[];
  correct_answers?: { option_id: number; option_text: string; option_image: any }[];
  no_of_rows: any;
  no_of_columns: any;
  is_active: boolean;
  is_deleted: boolean;
  has_answer?: boolean;
  fictitious_wallet_points?: string | null;
  remaining_fictitious_wallet_balance?: number;
  created_at: string;
  drag_drop_bases?: any;
  drag_drop_options?: any;
  updated_at: string;
  media: any[];
  options: any[];
}

export interface IListActivitiesRes {
  created_at: string;
  description: string;
  id: number;
  is_active: boolean;
  lesson_id: number;
  name: string;
  sequence: number;
  type: 'mcq' | 'match_pair' | 'drag_and_drop' | string;
}

export interface Classroom {
  id: number;
  name: string;
  description: any;
  section: any;
  room: any;
  economy: boolean;
}

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_photo: string;
}

// Student Chapter List Types
export interface IStudentChapterListItem {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  progress_percentage: number;
  is_completed: boolean;
  started_at: any;
  completed_at: any;
  last_accessed_at: any;
  classroom: Classroom;
  teacher: Teacher;
  created_at: string;
  updated_at: string;
}

export interface IStudentChapterListRes {
  chapter_list?: IStudentChapterListItem[];
  total_records?: number;
}

export interface IGetChapterByIdRes {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  link?: string;
  media: IGetChapterByIdResMedum[];
  downloadable_content: IGetChapterByIdResDownloadableContent[];
  lessons: IGetChapterByIdResLesson[];
  rubrics: IRubricItem[];
}

export interface IGetChapterByIdResMedum {
  id: number;
  media_url: string;
  media_type: number;
  thumbnail: any;
  originalname: string;
  size: number;
}

export interface IGetChapterByIdResDownloadableContent {
  id: number;
  media_url: string;
  media_type: number;
  originalname: string;
  size: number;
  is_downloadable: boolean;
}

export interface IGetChapterByIdResLesson {
  id: number;
  name: string;
  description: string;
  sequence: number;
  is_locked: boolean;
  status: string;
  activity_count: number;
}
