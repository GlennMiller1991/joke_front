import {IErrorResponse, IRequestOptions, IResponse, ISuccessResponse} from './contracts';
import {METHODS, RESPONSE_HEADERS} from './constants';

export async function request<T>(src: string, options: IRequestOptions = {
  method: METHODS.GET,
  mode: 'same-origin',
}): Promise<IResponse<T>> {
  try {
    let response = await fetch(src, {
      ...options
    })
    let contentType = response.headers.get(RESPONSE_HEADERS.CONTENT_TYPE) || ''
    let method: 'text' | 'json' = 'json'
    if (/text/.test(contentType)) {
      method = 'text'
    }

    let data = await response[method]()
    return {
      data,
    } as ISuccessResponse<T>
  } catch (err: any) {
    return {
      error: err?.message || ''
    } as IErrorResponse
  }
}
