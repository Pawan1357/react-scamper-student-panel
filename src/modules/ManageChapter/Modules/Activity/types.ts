export type ActivityType = 'MCQ' | 'Pair' | 'Drag & Drop';

export interface ActivityDetails {
  chapterName: string;
  lessonName: string;
  totalQuestions: number;
  activityName: string;
  activityType: ActivityType;
  publishedAt?: string;
  reviewedAt?: string;
  description: string;
  images: string[];
}

export interface MediaItem {
  id: string;
  imageSrc: string;
  title?: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  icon?: string;
  points: number;
  isCorrect?: boolean;
  isSelected?: boolean;
}

export interface MCQQuestion {
  id: string;
  type: 'mcq';
  questionText: string;
  questionDescription: string;
  images: string[];
  options: QuestionOption[];
}

export interface PairQuestion {
  id: string;
  type: 'Pair';
  questionText: string;
  questionDescription: string;
  images: string[];
  leftItems: PairItem[];
  rightItems: PairItem[];
}

export interface PairItem {
  id: string;
  label: string;
  icon?: string;
  image?: string;
  points: number;
}

export interface DragDropQuestion {
  id: string;
  type: 'Drag & Drop';
  instruction: string;
  questionDescription: string;
  images: string[];
  targets: DragDropTarget[];
  draggableItems: DragDropItem[];
}

export interface DragDropTarget {
  id: string;
  label: string;
  icon?: string;
}

export interface DragDropItem {
  id: string;
  label: string;
  icon?: string;
  image?: string;
  points: number;
  correctTargetId?: string;
}

export type Question = MCQQuestion | PairQuestion | DragDropQuestion;

export interface ActivityViewData {
  activityDetails: ActivityDetails;
  questions: Question[];
}

export interface RadioOptionProps {
  option: QuestionOption | PairItem;
  selectedOptionId?: string;
  isPairItem?: boolean;
}

export interface OptionListProps {
  options: QuestionOption[];
  selectedOptionId?: string;
  onOptionSelect?: (optionId: string) => void;
}

export interface DragDropAreaProps {
  targets: DragDropTarget[];
  draggableItems: DragDropItem[];
}

export interface PairMatchingProps {
  leftItems: PairItem[];
  rightItems: PairItem[];
}

export interface QuestionCardProps {
  questionText?: string;
  questionDescription?: string;
  instruction?: string;
  images?: string[];
}

export interface ActivityDetailsProps {
  activityDetails: ActivityDetails;
}

export interface QuestionTabsProps {
  totalQuestions: number;
  activeIndex: number;
  onTabChange: (index: number) => void;
}
