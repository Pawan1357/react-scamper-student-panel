// Can vary depending on your BE response
export interface IApiSuccess<T = undefined> {
  data: T;
  message?: number;
  statusCode?: number;
}

export interface IApiError {
  message?: string;
  status: number;
  timestamp?: string;
  endpoint?: string;
}

export interface ICommonPagination {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  type?: string;
  sort_order?: string;
  type?: string;
}
