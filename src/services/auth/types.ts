export interface ISignInReq {
  email: string;
  password: string;
}

export interface ISignInRes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  google_classroom_email: string;
  profile_photo: string;
  is_profile_updated: boolean;
  school_id: number;
  access_token: string;
}

export interface IForgotPasswordReq {
  email: string;
}

export interface IResetPasswordReq {
  reset_token: string;
  password: string;
}

export interface IChangePasswordReq {
  current_password: string;
  new_password: string;
}

export interface ICleverSignInReq {
  code: string;
  state?: string;
}

export interface IProfileRes extends ISignInRes {
  password: string;
  reset_token: any;
  reset_expires: any;
  last_login: string;
  google_id: any;
  clever_id: any;
  google_classroom_count: any;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProfileUpdateReq {
  first_name?: string;
  last_name?: string;
  google_classroom_email?: string;
  profile_photo?: string;
}
