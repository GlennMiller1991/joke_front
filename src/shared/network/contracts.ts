
import {METHODS, RESPONSE_HEADERS} from './constants';

export type ISuccessResponse<T> = {
  data: T,
  error?: never,
}
export type IErrorResponse = {
  data?: never,
  error: string,
}
export type IResponse<T> = ISuccessResponse<T> | IErrorResponse
export type IRequestOptions = {
  method: keyof typeof METHODS,
  mode: RequestMode,
}
export type IResponseHeaders = {
  [Key in keyof typeof RESPONSE_HEADERS]: typeof RESPONSE_HEADERS[Key]
}
