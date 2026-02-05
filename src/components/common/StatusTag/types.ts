export interface IStatusTagProps {
  status: string;
  color: string;
}

export enum STATUS_TAG_COLOR {
  SUCCESS_PRIMARY = '#68A729',
  SUCCESS_SECONDARY = '#3065DF',
  DANGER = '#F5222D',
  OTHER = '#CD30DF',
  GRAY = '#BDBDBD',
  PENDING = '#FA751C'
}

export enum CHAPTER_TAG_COLOR {
  LESSON = '#87B8DC',
  ACTIVITY = '#F1A306'
}
