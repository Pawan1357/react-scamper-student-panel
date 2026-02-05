export interface ICreateFaqReq {
  title: string;
  description: string;
  thumbnail: string;
  faq_category_id: number;
  faqs_for: string[];
  media: Medum[] | [];
}

export interface IUpdateFaqReq extends ICreateFaqReq {
  remove_media_ids?: number[];
  remove_thumbnail_image_name?: string;
}

export interface Medum {
  name?: string;
  media_type?: number;
  size?: number;
  originalname?: string;
}

export interface IFaqRes {
  faqs_list: IFaqListRes[] | [];
  total_records: number;
}

export interface IFaqListRes {
  id: number;
  faq_category_id: number;
  faqs_for: string[];
  title: string;
  description: string;
  thumbnail: string;
  updated_by: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  updated_user: UpdatedUser;
  faq_category: FaqCategory;
}

export interface UpdatedUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface FaqCategory {
  id: number;
  name: string;
}

export interface IGetFaqRes {
  id: number;
  faq_category_id: number;
  faqs_for: string[];
  title: string;
  description: string;
  thumbnail: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  updated_user: UpdatedUser;
  faq_category: FaqCategory;
  media: ViewMedum[];
}

export interface UpdatedUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface FaqCategory {
  id: number;
  name: string;
}

export interface ViewMedum {
  id: number;
  parent_type: string;
  media_url: string;
  media_type: number;
  thumbnail: any;
  is_downloadable: boolean;
  is_downloadable_content: boolean;
  size: number;
  originalname: string;
}
