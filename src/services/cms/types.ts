import { CmsTypeEnum } from 'utils/constants/enum';

export interface ICmsDetailsReq {
  title: CmsTypeEnum;
}

export interface ICmsDetailsRes {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IUpdateCmsReq {
  title: string;
  description: string;
}
