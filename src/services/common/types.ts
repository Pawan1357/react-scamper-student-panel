import { ImageTypeEnum } from 'utils/constants/enum';

export interface IUploadImageReq {
  files: File | File[];
  moduleName: ImageTypeEnum;
}

export interface IUploadedImage {
  name: string;
  url?: string;
}

export type IUploadImageRes = IUploadedImage[];
