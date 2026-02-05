// Can vary depending on your BE response
interface IApiSuccess<T> {
  data: T;
  message?: number;
}
interface IApiError {
  message?: string;
  status: number;
}
