export interface IContactListRes {
  contact_us_list: IContactUsListRes[] | [];
  total_records: number;
}

export interface IContactUsListRes {
  id: number;
  title: string;
  description: string;
  created_by: number;
  user_type: string;
  response: any;
  status: string;
  created_at: string;
  updated_at: string;
  user_name: string;
}

export interface IContactUsViewRes {
  id: number;
  title: string;
  description: string;
  response?: string | null;
  resolved_time?: string;
  status: string;
  resolved_by?: { id: number; name: string; email: string; profile_pic?: string | null };
  created_at: string;
  user_details: UserDetails;
}

export interface UserDetails {
  name: string;
  user_type: string;
  school: string;
  email: string;
  phone_number: string;
}
